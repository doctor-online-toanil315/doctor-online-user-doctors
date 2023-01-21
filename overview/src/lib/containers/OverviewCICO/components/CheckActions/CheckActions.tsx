import React, { useState } from "react";
import {
  Button,
  CloseIcon,
  Modal,
  openNotification,
} from "@nexthcm/components";

import { useTranslation } from "react-i18next";
import { StyledCheckActions } from "./styles";
import FingerLogo from "../../../../assets/finger-white.png";
import {
  useCallGetStatusMutation,
  useGetStatusQuery,
  useGetStreetMapMutation,
  usePostCheckMutation,
} from "../../../../services";

interface CheckActionsProps {
  setShowWorkingDays: React.Dispatch<React.SetStateAction<boolean>>;
  getTotalWorkingDay: any;
}

const CheckActions = ({
  setShowWorkingDays,
  getTotalWorkingDay,
}: CheckActionsProps) => {
  const { t } = useTranslation();
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [getStatus] = useCallGetStatusMutation();
  const { data: dataStatus, isLoading: isStatusLoading } = useGetStatusQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [getStreetMap, { isLoading: isStreetMapLoading }] =
    useGetStreetMapMutation();
  const [postCheckInOut, { isLoading: isPostCheckLoading }] =
    usePostCheckMutation();
  const onCheckOutClick = () => {
    getStatus({}).then((value: any) => {
      if (value.error) {
        openNotification({
          type: "error",
          message: t("common:ERRORS.INTERNAL_SERVER_ERROR"),
        });
      } else {
        setIsModalConfirm(true);
      }
    });
  };
  const handlePostCheck = (
    coords: GeolocationCoordinates,
    address: string | null
  ) => {
    postCheckInOut({
      address: address,
      latitude: coords.latitude,
      longitude: coords.longitude,
      typeCheckInOut: "web-app",
    }).then((value: any) => {
      if (value.error) {
        openNotification({
          type: "error",
          message: t("common:ERRORS.INTERNAL_SERVER_ERROR"),
        });
      } else {
        openNotification({
          type: "success",
          message:
            t(dataStatus?.data?.inTime ? "checkOut" : "checkIn") +
            " " +
            t("successfully").toLowerCase(),
        });
      }
    });
  };
  return (
    <StyledCheckActions>
      <Button
        className="btn-close"
        icon={<CloseIcon />}
        height={32}
        border={"borderless"}
        onClick={() => {
          getTotalWorkingDay({});
          setShowWorkingDays(true);
        }}
      />
      <div className="svg-icon">
        <img src={FingerLogo} alt="" />
      </div>
      <Button
        loading={isStreetMapLoading || isStatusLoading || isPostCheckLoading}
        disabled={isStreetMapLoading || isStatusLoading || isPostCheckLoading}
        onClick={() => onCheckOutClick()}
        height={56}
      >
        {t(dataStatus?.data?.inTime ? "checkOut" : "checkIn")}
      </Button>
      <Modal
        type="confirm"
        visible={isModalConfirm}
        className="modal-confirm-employees"
        confirmIcon="?"
        title={
          <span>
            {t("areYouSureYouWantTo", {
              action: t(
                dataStatus?.data?.inTime ? "checkOut" : "checkIn"
              ).toLowerCase(),
            })}
          </span>
        }
      >
        <div
          className="button"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            className="button-cancel"
            height={44}
            key="back"
            border="outline"
            onClick={() => {
              setIsModalConfirm(false);
            }}
          >
            {t("common:confirm.cancel")}
          </Button>
          <Button
            className="button-ok"
            height={44}
            key="submit"
            onClick={() => {
              setIsModalConfirm(false);
              navigator.geolocation.getCurrentPosition(
                (value) => {
                  const { coords } = value;
                  getStreetMap({
                    lat: coords.latitude,
                    lon: coords.longitude,
                    format: "json",
                  })
                    .unwrap()
                    .then((value) => {
                      handlePostCheck(coords, value.display_name);
                    })
                    .catch(() => {
                      handlePostCheck(coords, null);
                    });
                },
                () => {
                  openNotification({
                    type: "error",
                    message:
                      t(
                        "pleaseAllowTheRequestForGeolocationToUseThisFunction"
                      ) + ".",
                  });
                },
                {
                  enableHighAccuracy: false,
                  timeout: 10000,
                }
              );
            }}
          >
            {t("common:confirm.ok")}
          </Button>
        </div>
      </Modal>
    </StyledCheckActions>
  );
};

export default CheckActions;
