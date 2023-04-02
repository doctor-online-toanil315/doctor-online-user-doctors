import React, { useMemo } from "react";
import { StyledFilterDoctorContainer, StyledToolTipSlider } from "./styled";
import { Checkbox, Slider } from "doctor-online-components";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const FilterDoctor = () => {
  const form = useForm({
    defaultValues: {
      consultationFee: [10, 10],
      specialList: [],
    },
  });
  const { t } = useTranslation();

  const handleSliderChange = (value: number[]) => {
    form.setValue("consultationFee", value);
  };

  const handleSpecialItemCheck = (e: CheckboxChangeEvent) => {
    const checkedSpecial = new Set(form.getValues("specialList") as string[]);
    if (checkedSpecial.has(e.target.name ?? "")) {
      checkedSpecial.delete(e.target.name ?? "");
    } else {
      checkedSpecial.add(e.target.name ?? "");
    }
    console.log(checkedSpecial);

    form.setValue("specialList", Array.from(checkedSpecial) as any);
  };

  const handleSliderAfterChange = (value: number[]) => {
    form.setValue("consultationFee", value);
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

  return (
    <StyledFilterDoctorContainer>
      <FormProvider {...form}>
        <div className="form-group">
          <h3>{t("consultationFee")}</h3>
          <Slider
            onChange={handleSliderChange}
            min={10}
            max={500}
            range
            name="consultationFee"
            tooltip={{
              open: true,
              formatter: (value) => <span>${value}</span>,
              placement: "bottom",
            }}
          />
        </div>
        <div style={{ marginTop: 70 }} className="form-group">
          <h3>{t("selectSpecialList")}</h3>
          <ul className="special-list">
            {specialList.map((special) => {
              return (
                <div className="special-item">
                  <Checkbox name={special} onChange={handleSpecialItemCheck} />
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
