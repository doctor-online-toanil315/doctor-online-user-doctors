import React, { useEffect, useMemo } from "react";
import { StyledFilterDoctorContainer, StyledToolTipSlider } from "./styled";
import { Checkbox, Slider } from "doctor-online-components";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useSearchParams } from "react-router-dom";
import { useDebounceWithoutDependencies } from "src/lib/hooks";

const FilterDoctor = () => {
  const form = useForm({
    defaultValues: {
      consultationFee: [0],
      specialList: [""],
    },
  });
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    specialList: specialListParams,
    fromPrice,
    toPrice,
  } = Object.fromEntries(searchParams.entries());
  const { setDebounce } = useDebounceWithoutDependencies(300);

  const handleSpecialItemCheck = (e: CheckboxChangeEvent) => {
    const checkedSpecial = new Set(form.getValues("specialList") as string[]);
    if (checkedSpecial.has(e.target.name ?? "")) {
      checkedSpecial.delete(e.target.name ?? "");
    } else {
      checkedSpecial.add(e.target.name ?? "");
    }

    const arrSpecial = Array.from(checkedSpecial);
    if (arrSpecial.length) {
      searchParams.append("specialList", arrSpecial as any);
    } else {
      searchParams.delete("specialList");
    }
    setSearchParams(searchParams);
  };

  const handleSliderAfterChange = (value: number[]) => {
    setDebounce(() => {
      searchParams.delete("fromPrice");
      searchParams.delete("toPrice");
      searchParams.append("fromPrice", String(value[0]));
      searchParams.append("toPrice", String(value[1]));
      setSearchParams(searchParams);
    });
  };

  const specialList = useMemo(() => {
    return [
      "Nhà tiết niệu học",
      "Nha sĩ",
      "Chỉnh hình",
      "Bác sĩ tim mạch",
      "Phẫu thuật thần kinh",
      "Bác sĩ phẫu thuật não & cột sống",
      "Bác sĩ phụ khoa",
      "Bác sĩ nhãn khoa",
      "Bác sĩ da liễu",
    ];
  }, []);

  useEffect(() => {
    if (fromPrice && toPrice) {
      form.setValue("consultationFee", [Number(fromPrice), Number(toPrice)]);
    } else {
      form.setValue("consultationFee", [100000, 300000]);
    }
    form.setValue("specialList", specialListParams?.split(",") ?? []);
  }, [searchParams]);

  return (
    <StyledFilterDoctorContainer>
      <FormProvider {...form}>
        <div className="form-group">
          <h3>{t("consultationFee")}</h3>
          <Slider
            onAfterChange={handleSliderAfterChange}
            onChange={(value) => form.setValue("consultationFee", value)}
            min={50000}
            max={500000}
            step={10000}
            value={form.getValues("consultationFee") as [number, number]}
            range
            name="consultationFee"
            tooltip={{
              open: true,
              formatter: (value) => <span>{value?.toLocaleString()} VND</span>,
              placement: "bottom",
            }}
          />
        </div>
        <div style={{ marginTop: 70 }} className="form-group">
          <h3>{t("selectSpecialList")}:</h3>
          <ul className="special-list">
            {specialList.map((special) => {
              return (
                <div className="special-item">
                  <Checkbox
                    checked={form.getValues("specialList").includes(special)}
                    name={special}
                    onChange={handleSpecialItemCheck}
                  />
                  <span>{special}</span>
                </div>
              );
            })}
          </ul>
        </div>
      </FormProvider>
    </StyledFilterDoctorContainer>
  );
};

export default FilterDoctor;
