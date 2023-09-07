import React from "react";
import {Avatar, Button, Card, Col, List, message, Modal, Row, Space, Table, Tag} from 'antd';
import {EditOutlined, FileDoneOutlined} from "@ant-design/icons";
import appointmentService from "../../../service/AppointmentService";
import moment from "moment";


export class AppointmentScheduledTableComp extends React.Component {

    columns: any = [
        {
            title: "Consultant Name",
            dataIndex: "consultantName",
            key: "consultantName",
            width: 150,
            render: (text: any, record: any) => (
                <>
                    <div className="avatar-info">
                        <h6>{record.consultantName}</h6>
                        <p>{record.consultantEmail}</p>
                    </div>
                </>
            )
        },
        {
            title: "JobSeeker Name",
            dataIndex: "jobSeekerName",
            key: "jobSeekerName",
            width: 150,
            render: (text: any, record: any) => (
                <>
                    <div className="avatar-info">
                        <h6>{record.jobSeekerName}</h6>
                        <p>{record.jobSeekerEmail}</p>
                    </div>
                </>
            )
        },
        {
            title: "Job Type",
            dataIndex: "jobSeekerJobType",
            key: "jobSeekerJobType",
            width: 100,
            /*render: (text: any, record: any) => (
                <>
                    <div className="author-info">
                        {/!*<h6 >{record.jobSeekerJobType}</h6>*!/}
                        <p>{record.jobSeekerJobType}</p>
                    </div>
                </>
            )*/
        },
        {
            title: "Country",
            dataIndex: "jobSeekerCountry",
            key: "jobSeekerCountry",
            width: 100,
            /*render: (text: any, record: any) => (
                <>
                    <div className="author-info">
                        {/!*<h6 >{record.jobType}</h6>*!/}
                        <p>{record.jobSeekerCountry}</p>
                    </div>
                </>
            )*/
        },

        {
            title: "Status",
            key: "appointmentStatus",
            dataIndex: "appointmentStatus",
            width: 100,
            render: (text: any, record: any) => {
                if (text === 'SCHEDULED') {
                    return {
                        // children: <Button type="primary" className="tag-primary">{text}</Button>
                        children: <Space size="small"><Tag color='green'>{text}</Tag></Space>
                    }
                } else if (text === 'PENDING') {
                    return {
                        children: <Space size="small"><Tag color='orange'>{text}</Tag></Space>
                    }
                } else {
                    return {
                        children: <Space size="small"><Tag color='orange'>{text}</Tag></Space>
                    }
                }

                /* <>
                     <Button type="primary" className="tag-primary">ONLINE</Button>
                 </>*/
            }
        },
        {
            title: "Appointment Date",
            dataIndex: "date",
            width: 100,
            key: 'date'
        },
        {
            title: "Appointment Time",
            dataIndex: "time",
            width: 100,
            key: 'time',
            render: (text: any, rec: any) => {
                const parsedTime = moment(text, "HH:mm");
                const formattedTime = parsedTime.format("h:mm A");

                if (null !== text && text.length > 0)
                    return text+ " ("+formattedTime+")"
                else
                    return text;
            }
        },
        {
            title: "Created Date/Time",
            dataIndex: "createdDate",
            width: 100,
            key: 'createdDate',
            render: (key: any, rec: any) => {
                if (moment(rec.createdDate).isValid())
                    return moment(rec.createdDate).format("YYYY-MM-DD HH:mm:ss")
                else
                    return "N/A";
            }
        },
        {
            title: "Modified Date/Time",
            dataIndex: "modifiedDate",
            width: 100,
            key: 'modifiedDate',
            render: (key: any, rec: any) => {
                if (moment(rec.modifiedDate).isValid())
                    return moment(rec.modifiedDate).format("YYYY-MM-DD HH:mm:ss")
                else
                    return "N/A";
            }
        },
        {
            title: "Action",
            key: "action",
            fixed: "right",
            dataIndex: "action",
            width: 100,
            render: (text: any, record: any) => (
                /*<List size={"small"} style={{marginLeft: '8px'}}>
                    <li>
                        <Button style={{border: 'none', height: 20}} size={"small"}
                                icon={<FileDoneOutlined style={{fontSize: 15}}/>}
                                onClick={() => {
                                    this.onClickCompleteAppointment(record.appointmentId);
                                }}
                        >Complete
                        </Button>
                    </li>
                </List>*/
                <div
                    style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContents: 'center'}}>
                    <Button style={{border: 'none', height: 30}} size={"small"}
                            icon={<FileDoneOutlined style={{fontSize: 15}}/>}
                            onClick={() => {
                                this.onClickCompleteAppointment(record.appointmentId);
                            }}
                    >Complete
                    </Button>
                </div>
            )
        }

        ,
    ]


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = () => {
        this.setState({loading: true});
        let email = localStorage.getItem("USER_EMAIL");
        return appointmentService.getAllAppointmentDetailListForConsultant(email, "SCHEDULED")
            .then(res => {
                let data: Array<any> = res.data;
                console.log("data", data);
                if (200 === res.status || 201 === res.status) {

                    if (data.length === 0) {
                        message.error("Result not found").then();
                    }

                    this.setState({
                        data: data,
                        loading: false
                    }, () => {
                        console.log("state list", this.state.data);
                    });

                }
            }, (error: any) => {
                this.setState({loading: false});
                message.error(error.response.data.message).then();
            });
    }

    onClickCompleteAppointment = (appointmentId) => {
        this.setState({loading: true});

        Modal.confirm({
            title: "Do you want to complete this appointment?",
            content: "When clicked the OK button, this appointment will be completed",
            onOk: () => {
                appointmentService.completeAppointment(appointmentId).then(res => {
                    this.setState({loading: false});
                    if (200 === res.status || 201 === res.status) {
                        message.success("Successfully Completed").then();
                        this.fetch();
                    }

                }, (error: any) => {
                    this.setState({loading: false});
                    if (error.response.status !== 500) {
                        message.error(error.response.data.message).then();
                    } else {
                        if (error.response.data.message.includes("JSON parse error: Cannot deserialize value of type ")) {
                            message.error("Invalid input, Please check.").then();
                        } else {
                            message.error("System Error, Please contact your system administrator").then();
                        }
                    }
                });
            },
            onCancel: () => {
                return new Promise((resolve) => {
                    setTimeout(resolve, 500);
                }).then(() => this.setState({
                    loading: false
                })).catch(() => console.log("Oops errors!"));
            }
        });
    }

    render() {
        // const {data, pagination, loading} = this.state;
        return (
            <div>
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <Row gutter={8} style={{marginTop: "12px"}}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Card>

                                    <div style={{marginTop: "10px"}}>
                                        <Table
                                            columns={this.columns}
                                            dataSource={this.state.data}
                                            pagination={false}
                                            className="ant-border-space"
                                            loading={this.state.loading}
                                            scroll={{x: 1800, y: 500}}
                                        />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
