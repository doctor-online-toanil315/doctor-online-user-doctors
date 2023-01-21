import {
  Button,
  Modal,
  openNotification,
  StarBold,
  Table,
  Title,
} from "@nexthcm/components";
import {
  StyledContainerEveryone,
  StyledContainerTable,
  StyledHeader,
} from "./styles";
import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

import { useSearchParams } from "react-router-dom";
import useFilterEveryone from "../../hooks/useFilterEveryone";
import { AlignType } from "rc-table/lib/interface";
import "./styles.scss";
import { Tooltip } from "antd";
import { EveryoneFilter } from "../../containers/OverviewEveryone/components/EveryoneFilter";
import { LeaveTypes } from "../../containers/OverviewEveryone/components/LeaveTypes";
import { ChangeDateTable } from "../../containers/OverviewEveryone/components/ChangeDateTable";
import {
  useGetLeavesEveryoneQuery,
  usePutActionsMutation,
} from "../../services";

const Everyone = () => {
  const { t, i18n } = useTranslation();
  const tableInstance = Table.useTable();
  const tableRef = useRef(null as any);
  const [searchParams] = useSearchParams();
  const [idUser, setIdUser] = useState("");
  const [typeAction, setTypeAction] = useState("");
  const [idAction, setIdAction] = useState("");
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const paramsFilterEveryone = useFilterEveryone();
  const daysInMonth = moment(new Date()).daysInMonth();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const [changeAction] = usePutActionsMutation();
  const { data, isFetching, refetch } = useGetLeavesEveryoneQuery(
    {
      ...tableInstance.params,
      ...paramsFilterEveryone.params,
      search: searchParams.get("search") ?? "",
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const daysColumns: ColumnsType = daysArray.map((day, index) => {
    return {
      key: day,
      dataIndex: `leaves`,
      title: day,
      align: "center" as AlignType,
      render: (leaves) => {
        if (leaves[index + 1]?.[0].isWeekend) {
          return {
            props: {
              style: {
                boxSizing: "border-box",
                background: "#f45725",
                opacity: "12.0%",
                border: "1px solid #41474d",
              },
            },
          };
        } else if (leaves[index + 1]?.[0].holidayName) {
          return (
            <Tooltip
              overlayClassName="tooltip-everyone"
              showArrow={false}
              autoAdjustOverflow={true}
              overlayStyle={{ maxWidth: "max-content" }}
              title={
                <div className="short-name-container">
                  <div className="tooltip-container">
                    <div className="tooltips">
                      <div className="title">Holiday:</div>
                      <div className="content">
                        {leaves[index + 1]?.[0].holidayName}
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              <div className="holiday">
                <StarBold />
              </div>
            </Tooltip>
          );
        }
        return (
          (
            <div className="short-name-container">
              {leaves[index + 1]?.map((item, index) => (
                <div
                  key={index}
                  className="short-name"
                  style={{
                    background: `${item.currentState?.stateType?.color}`,
                  }}
                >
                  <Tooltip
                    overlayClassName="tooltip-everyone"
                    placement={"topRight"}
                    showArrow={false}
                    autoAdjustOverflow={true}
                    zIndex={3}
                    title={
                      <div className="tooltip-container">
                        <div className="tooltips">
                          <div className="title">
                            {t("overViewEveryone.leaveTypes")}
                          </div>
                          <div className="content">{item.leaveType?.name}</div>
                        </div>
                        <div className="tooltips">
                          <div className="title">
                            {t("overViewEveryone.dateRange")}
                          </div>
                          <div className="content">
                            {moment(item.fromDate).format("M/D/YYYY") ===
                            moment(item.toDate).format("M/D/YYYY")
                              ? `${moment(item.toDate).format("M/D/YYYY")} `
                              : `${moment(item.fromDate).format("M/D/YYYY")} ${
                                  item.items[0]?.morning
                                    ? "(Morning)"
                                    : item.items[0]?.afternoon
                                    ? "(Afternoon)"
                                    : ""
                                } - ${moment(item.toDate).format("M/D/YYYY")} ${
                                  item.items[1]?.fromTime
                                    ? `(${moment
                                        .utc(item.items[1]?.fromTime * 1000)
                                        .format("HH:mm")} - ${moment
                                        .utc(item.items[1]?.toTime * 1000)
                                        .format("HH:mm")})`
                                    : ""
                                }`}
                          </div>
                        </div>
                        <div className="tooltips">
                          <div className="title">
                            {t("overViewEveryone.days")}
                          </div>
                          <div className="content">{item.durationInDay}</div>
                        </div>
                        <div className="tooltips">
                          <div className="title">
                            {t("overViewEveryone.status")}
                          </div>
                          <div
                            className="content current-state"
                            style={{
                              background: `${item.currentState?.stateType?.color}`,
                            }}
                          >
                            {item.currentState?.name}
                          </div>
                        </div>
                        {item.nextStates?.length > 0 && (
                          <div className="tooltips">
                            <div className="title">
                              {t("overViewEveryone.actions")}
                            </div>
                            <div className="content">
                              {item.nextStates.map((action) => (
                                <span
                                  className="action"
                                  key={action.id}
                                  onClick={() => {
                                    setIdUser(item.id);
                                    setTypeAction(action.state.name);
                                    setIdAction(action.state.id);
                                    setIsModalDeleteVisible(true);
                                  }}
                                >
                                  {action.transition.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    }
                  >
                    {item.shortNameLT}
                  </Tooltip>
                </div>
              ))}
            </div>
          ) || null
        );
      },
    };
  });

  const columns: ColumnsType = [
    {
      key: "cif",
      dataIndex: "user",
      title: t("overViewEveryone.cif"),
      width: 110,
      render: (user) => user.cif,
      fixed: "left",
      align: "center" as AlignType,
    },
    {
      key: "name",
      dataIndex: "user",
      title: t("overViewEveryone.name"),
      width: 200,
      render: (user) => <p className="user-name">{user.fullName}</p>,
      fixed: "left",
      align: "left" as AlignType,
    },
    {
      key: "leaveDays",
      dataIndex: "workingInfoCurrentMonth",
      title: t("overViewEveryone.leaveDays"),
      width: 110,
      render: (workingInfo) => workingInfo.totalLeave,
      fixed: "left",
      align: "center" as AlignType,
    },
    {
      key: "workingDays",
      dataIndex: "workingInfoCurrentMonth",
      title: t("overViewEveryone.workingDays"),
      width: 120,
      align: "right" as AlignType,
      render: (workingInfo) => (
        <Tooltip
          overlayClassName="tooltip-everyone"
          showArrow={false}
          autoAdjustOverflow={true}
          overlayStyle={{ maxWidth: "max-content" }}
          title={
            <div className="short-name-container">
              <div className="tooltip-container">
                <div className="tooltips">
                  <div className="title-working">Working days:</div>
                  <div className="content-working">
                    {workingInfo.workingDay}
                  </div>
                </div>
                <div className="tooltips">
                  <div className="title-working">
                    Total current working days:
                  </div>
                  <div className="content-working">
                    {workingInfo.currentTotalWorkingDay}
                  </div>
                </div>
                <div className="tooltips">
                  <div className="title-working">
                    Total working days this month:
                  </div>
                  <div className="content-working">
                    {workingInfo.totalWorkingDay}
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <span>{workingInfo.workingDay}</span>
          <span className="working-day">
            <sup>{workingInfo.currentTotalWorkingDay}</sup>
            <span>/</span>
            <sub>{workingInfo.totalWorkingDay}</sub>
          </span>
        </Tooltip>
      ),
      fixed: "left",
    },
    ...daysColumns,
  ];

  const leavesData = data?.data?.items?.map((item, index) => {
    return {
      key: index,
      ...item,
    };
  });

  useEffect(() => {
    const tableContent = document.querySelectorAll(
      ".ant-table-content"
    )[0] as HTMLElement;

    tableRef?.current.addEventListener("mousemove", (e) => {
      const scrollY =
        tableContent.getBoundingClientRect().top -
        window.scrollY +
        tableContent.clientHeight -
        73;
      if (e.pageY - scrollY >= 69 && e.pageY - scrollY <= 72) {
        tableContent?.classList.add("more-width-table");
      } else {
        tableContent?.classList.remove("more-width-table");
      }
    });
  }, [data?.data?.items]);

  const handlePutAction = () => {
    changeAction({ idUser: idUser, idAction: idAction })
      .unwrap()
      .then(() => {
        openNotification({
          type: "success",
          message: t("overViewEveryone.actionSuccess"),
        });
        refetch();
        setIsModalDeleteVisible(false);
      })
      .catch((error) => {
        const errorMessage = i18n.exists(`common:ERRORS.${error.data.message}`)
          ? t(`common:ERRORS.${error.data.message}`)
          : t(`common:HTTP_RESPONSE_ERROR_MESSAGES.${error.status}`);
        openNotification({
          type: "error",
          message: errorMessage,
        });
      });
  };

  return (
    <StyledContainerEveryone>
      <Title level={5} className="title-leave-calendar mb-8">
        {t("overViewEveryone.leaveCalendar")}
      </Title>
      <StyledHeader>
        <EveryoneFilter />
        <LeaveTypes />
      </StyledHeader>
      <ChangeDateTable />
      <StyledContainerTable ref={tableRef}>
        <Table
          columns={columns}
          dataSource={leavesData}
          tableInstance={tableInstance}
          totalElements={data?.data?.totalElements}
          totalPages={data?.data?.totalPages}
          loading={isFetching}
          size={"small"}
          scroll={{ x: "max-content" }}
          bordered={true}
        />
      </StyledContainerTable>
      <Modal
        type="confirm"
        visible={isModalDeleteVisible}
        className="modal-confirm-actions"
        onCancel={() => setIsModalDeleteVisible(false)}
        confirmIcon="?"
        title={
          <>
            <p className="title-confirm">{t("overViewEveryone.titleModal")}</p>
            <p className="type-action">{typeAction.toLowerCase()}</p>
          </>
        }
      >
        <div className="btn">
          <Button
            height={44}
            className="btn-cancel"
            onClick={() => setIsModalDeleteVisible(false)}
          >
            {t("common:confirm.cancel")}
          </Button>
          <Button height={44} className="btn-ok" onClick={handlePutAction}>
            {t("common:confirm.ok")}
          </Button>
        </div>
      </Modal>
    </StyledContainerEveryone>
  );
};

export default Everyone;
