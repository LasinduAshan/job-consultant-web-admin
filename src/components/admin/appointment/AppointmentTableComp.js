import React from "react";
import {Card, Col, message, Radio, Row, Space, Table, Tag} from 'antd';
import appointmentService from "../../../service/AppointmentService";
import moment from "moment/moment";


export class AppointmentTableComp extends React.Component {

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
                } else if (text === 'COMPLETED') {
                    return {
                        children: <Space size="small"><Tag color='blue'>{text}</Tag></Space>
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
        /*{
            title: "EMPLOYED",
            key: "employed",
            dataIndex: "employed",
            render: (text: any, record: any) => (
                <>
                    <div className="ant-employed">
                        <span>23/04/18</span>
                        <a href="src/pages#pablo">Edit</a>
                    </div>
                </>
            )
        },*/
        /*{
            title: <div style={{marginLeft: '20px'}}>Action</div>,
            key: "action",
            fixed: "right",
            dataIndex: "action",
            // width: 100,
            render: (text: any, record: any) => (
                <List size={"small"} style={{marginLeft: '8px'}}>
                    <li>
                        <Link to={{
                            pathname: `/admin/consultant-form/${record.consultantId}`,
                            state: record,
                            // hash: "edit"
                        }}>
                            <Button style={{border: 'none', height: 20}} size={"small"}
                                    icon={<EditOutlined style={{fontSize: 15}}/>}
                            >Edit
                            </Button>
                        </Link>
                        {/!*<Button style={{border: 'none', height: 20}} size={"small"}
                                icon={<FileDoneOutlined style={{fontSize: 15}}/>}
                                onClick={() => {
                                    // this.props.onClickCancelLeave(record.id);
                                }}
                        >Cancel
                        </Button>*!/}
                    </li>
                </List>
            )
        }*/

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
        this.fetch("ALL");
    }

    fetch = (appointmentStatus) => {
        this.setState({loading: true});
        return appointmentService.getAllAppointmentsForAdmin(appointmentStatus).then(res => {
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

    onChangeFilter = (value) => {
        console.log("filter value, ", value)
        this.fetch(value);
    }

    render() {
        // const {data, pagination, loading} = this.state;
        return (
            <div>
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <Row gutter={8} style={{marginTop: "12px"}}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Card title="Appointments Table"
                                      extra={
                                          <>
                                              <Radio.Group onChange={(value) => {this.onChangeFilter(value.target.value)}} defaultValue="ALL">
                                                  <Radio.Button value="ALL">All</Radio.Button>
                                                  <Radio.Button value="SCHEDULED">Scheduled</Radio.Button>
                                                  <Radio.Button value="PENDING">Pending</Radio.Button>
                                                  <Radio.Button value="REJECTED">Rejected</Radio.Button>
                                                  <Radio.Button value="COMPLETED">Completed</Radio.Button>
                                              </Radio.Group>
                                          </>
                                      }
                                >

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
