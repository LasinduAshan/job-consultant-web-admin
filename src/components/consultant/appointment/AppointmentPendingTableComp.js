import React from "react";
import {
    Avatar,
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    List,
    message,
    Modal,
    Row,
    Select,
    Space,
    Spin,
    Table,
    Tag
} from 'antd';
import face2 from "../../../assets/images/face-2.jpg";
import face3 from "../../../assets/images/face-3.jpg";
import face from "../../../assets/images/face-1.jpg";
import face4 from "../../../assets/images/face-4.jpg";
import face5 from "../../../assets/images/face-5.jpeg";
import face6 from "../../../assets/images/face-6.jpeg";
import Title from "antd/es/skeleton/Title";
import consultantService from "../../../service/ConsultantService";
import {CloseOutlined, EditOutlined, FileDoneOutlined, SaveOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import appointmentService from "../../../service/AppointmentService";
import TextArea from "antd/es/input/TextArea";
import moment from "moment/moment";

const {Option, OptGroup} = Select;

export class AppointmentPendingTableComp extends React.Component {

    /* columns: any = [
         {
             title: "No",
             dataIndex: "rowId",
             key: "rowId",
             width: 40,
             align: 'center',
         },
         {
             title: "Customer Name",
             dataIndex: "fullName",
             width: 150,
             sorter: false,
             key: 'userName',
         },
         {
             title: "Identity Type",
             dataIndex: "identityTypeDesc",
             width: 95,
             sorter: false,
             key: '2'
         },
         {
             title: "ID Number",
             dataIndex: "idNo",
             width: 95,
             sorter: false,
             key: '2'
         },
         {
             title: "Input User",
             dataIndex: "createdBy",
             width: 150,
             sorter: false,
             key: '4'
         },
         {
             title: "Input Date/Time",
             dataIndex: "createdDate",
             width: 150,
             sorter: false,
             key: 'createdDate',
             render: (key: any, rec: any) => {
                 if (moment(rec.createdDate).isValid())
                     return moment(rec.createdDate).format("YYYY-MM-DD HH:mm:ss")
                 else
                     return "N/A";
             }
         }, {
             title: "Name",
             dataIndex: "fullName",
             align: "left",
             width: 150,
             sorter: false,
         }, {
             title: <div style={{marginLeft: '20px'}}>Action</div>,
             key: "action",
             fixed: "right",
             dataIndex: "action",
             width: 160,
             render: (text: any, record: any) => (
                 <List size={"small"} style={{marginLeft: '12px'}}>
                     <li>
                         <RenderOnRole roles={['REMOVE_USER_BLACKLIST']}>
                             <Button style={{border: 'none', height: 20}} size={"small"}
                                     icon={<FileDoneOutlined style={{fontSize: 15}}/>}
                                     onClick={() => {
                                         this.props.onClickRemoveBlacklist(record.id);
                                     }}
                             >Remove from Blacklist
                             </Button>
                         </RenderOnRole>
                     </li>
                 </List>
             ),
         }
     ]*/

    columns: any = [
        {
            title: "Consultant Name",
            dataIndex: "consultantName",
            key: "consultantName",
            width: 20,
            /*  render: (text: any, record: any) => (
                  <>
                      <Avatar.Group>
                          <Avatar
                              className="shape-avatar"
                              shape="square"
                              size={40}
                              src={face2}
                          ></Avatar>
                          <div className="avatar-info">
                              <h6>{record.consultantName}</h6>
                              <p>{record.email}</p>
                          </div>
                      </Avatar.Group>{" "}
                  </>
              )*/
        },
        {
            title: "Job Type",
            dataIndex: "jobSeekerJobType",
            key: "jobSeekerJobType",
            width: 15,
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
            width: 15,
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
            title: "STATUS",
            key: "appointmentStatus",
            dataIndex: "appointmentStatus",
            width: 15,
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
            title: "Date",
            dataIndex: "date",
            width: 15,
            key: 'date'
        },
        {
            title: "Time",
            dataIndex: "time",
            width: 15,
            key: 'time'
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
        {
            title: <div style={{marginLeft: '20px'}}>Action</div>,
            key: "action",
            fixed: "right",
            dataIndex: "action",
            width: 15,
            render: (text: any, record: any) => (
                <List size={"small"} style={{marginLeft: '8px'}}>
                    <li>

                        <Button style={{border: 'none', height: 20}} size={"small"}
                                icon={<EditOutlined style={{fontSize: 15}}/>}
                                onClick={() => {
                                    this.onClickAppointmentSchedule(record.appointmentId, record.consultantId, false);
                                }}
                        >Approve
                        </Button>
                        <Button style={{border: 'none', height: 20}} size={"small"}
                                icon={<FileDoneOutlined style={{fontSize: 15}}/>}
                                onClick={() => {
                                    this.onClickAppointmentSchedule(record.appointmentId, record.consultantId, true);
                                }}
                        >Reject
                        </Button>
                    </li>
                </List>
            )
        }

        ,
    ]


    /*data: any = [
        {
            key: "1",
            name: (
                <>
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar"
                            shape="square"
                            size={40}
                            src={face2}
                        ></Avatar>
                        <div className="avatar-info">
                            <Title level={5}>Michael John</Title>
                            <p>michael@mail.com</p>
                        </div>
                    </Avatar.Group>{" "}
                </>
            ),
            function: (
                <>
                    <div className="author-info">
                        <Title level={5}>Manager</Title>
                        <p>Organization</p>
                    </div>
                </>
            ),

            status: (
                <>
                    <Button type="primary" className="tag-primary">
                        ONLINE
                    </Button>
                </>
            ),
            employed: (
                <>
                    <div className="ant-employed">
                        <span>23/04/18</span>
                        <a href="src/pages#pablo">Edit</a>
                    </div>
                </>
            ),
        },

        {
            key: "2",
            name: (
                <>
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar"
                            shape="square"
                            size={40}
                            src={face3}
                        ></Avatar>
                        <div className="avatar-info">
                            <Title level={5}>Alexa Liras</Title>
                            <p>alexa@mail.com</p>
                        </div>
                    </Avatar.Group>{" "}
                </>
            ),
            function: (
                <>
                    <div className="author-info">
                        <Title level={5}>Programator</Title>
                        <p>Developer</p>
                    </div>
                </>
            ),

            status: (
                <>
                    <Button className="tag-badge">ONLINE</Button>
                </>
            ),
            employed: (
                <>
                    <div className="ant-employed">
                        <span>23/12/20</span>
                        <a href="src/pages#pablo">Edit</a>
                    </div>
                </>
            ),
        },

        {
            key: "3",
            name: (
                <>
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar"
                            shape="square"
                            size={40}
                            src={face}
                        ></Avatar>
                        <div className="avatar-info">
                            <Title level={5}>Laure Perrier</Title>
                            <p>laure@mail.com</p>
                        </div>
                    </Avatar.Group>{" "}
                </>
            ),
            function: (
                <>
                    <div className="author-info">
                        <Title level={5}>Executive</Title>
                        <p>Projects</p>
                    </div>
                </>
            ),

            status: (
                <>
                    <Button type="primary" className="tag-primary">
                        ONLINE
                    </Button>
                </>
            ),
            employed: (
                <>
                    <div className="ant-employed">
                        <span>03/04/21</span>
                        <a href="src/pages#pablo">Edit</a>
                    </div>
                </>
            ),
        },
        {
            key: "4",
            name: (
                <>
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar"
                            shape="square"
                            size={40}
                            src={face4}
                        ></Avatar>
                        <div className="avatar-info">
                            <Title level={5}>Miriam Eric</Title>
                            <p>miriam@mail.com</p>
                        </div>
                    </Avatar.Group>{" "}
                </>
            ),
            function: (
                <>
                    <div className="author-info">
                        <Title level={5}>Marketing</Title>
                        <p>Organization</p>
                    </div>
                </>
            ),

            status: (
                <>
                    <Button type="primary" className="tag-primary">
                        ONLINE
                    </Button>
                </>
            ),
            employed: (
                <>
                    <div className="ant-employed">
                        <span>03/04/21</span>
                        <a href="src/pages#pablo">Edit</a>
                    </div>
                </>
            ),
        },
        {
            key: "5",
            name: (
                <>
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar"
                            shape="square"
                            size={40}
                            src={face5}
                        ></Avatar>
                        <div className="avatar-info">
                            <Title level={5}>Richard Gran</Title>
                            <p>richard@mail.com</p>
                        </div>
                    </Avatar.Group>{" "}
                </>
            ),
            function: (
                <>
                    <div className="author-info">
                        <Title level={5}>Manager</Title>
                        <p>Organization</p>
                    </div>
                </>
            ),

            status: (
                <>
                    <Button className="tag-badge">ONLINE</Button>
                </>
            ),
            employed: (
                <>
                    <div className="ant-employed">
                        <span>23/03/20</span>
                        <a href="src/pages#pablo">Edit</a>
                    </div>
                </>
            ),
        },

        {
            key: "6",
            name: (
                <>
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar"
                            shape="square"
                            size={40}
                            src={face6}
                        ></Avatar>
                        <div className="avatar-info">
                            <Title level={5}>John Levi</Title>
                            <p>john@mail.com</p>
                        </div>
                    </Avatar.Group>{" "}
                </>
            ),
            function: (
                <>
                    <div className="author-info">
                        <Title level={5}>Tester</Title>
                        <p>Developer</p>
                    </div>
                </>
            ),

            status: (
                <>
                    <Button className="tag-badge">ONLINE</Button>
                </>
            ),
            employed: (
                <>
                    <div className="ant-employed">
                        <span>14/04/17</span>
                        <a href="src/pages#pablo">Edit</a>
                    </div>
                </>
            ),
        },
    ];*/

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            isVisibleModal: false,
            isReject: false,
            timeSlotList: [],
            consultantId: null
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = () => {
        this.setState({loading: true});
        let email = localStorage.getItem("USER_EMAIL");
        return appointmentService.getAllAppointmentDetailListForConsultant(email, "PENDING")
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


    onClickAppointmentSchedule = (appointmentId, consultantId, isReject) => {
        const currentDayName = moment().format('dddd');
        const currentDate = moment().format('YYYY-MM-DD');

        this.formRef.current.setFieldsValue({
            date: moment(),
            appointmentId: appointmentId
        });
        this.setState({isVisibleModal: true, consultantId: consultantId, isReject: isReject});

        if (!isReject) {
            this.getAvailabilityTimeSlots(currentDate, currentDayName.toUpperCase(), consultantId);
        }
    }

    onChangeDate = (value) => {
        const currentDayName = moment(value).format('dddd');
        const currentDate = moment(value).format('YYYY-MM-DD');
        this.formRef.current.resetFields(["time"]);

        this.getAvailabilityTimeSlots(currentDate, currentDayName.toUpperCase(), this.state.consultantId);
    }

    getAvailabilityTimeSlots = (date, day, consultantId) => {
        this.setState({loading: true});

        consultantService.getAvailabilityTimeSlots(date, day, consultantId)
            .then(res => {
                let data: Array<any> = res.data;
                console.log("data", data);
                if (200 === res.status || 201 === res.status) {

                    if (data.length === 0) {
                        message.error("Result not found").then();
                    }

                    this.setState({
                        timeSlotList: data,
                        loading: false
                    }, () => {
                        console.log("state time slot list", this.state.timeSlotList);
                    });

                }
            }, (error: any) => {
                this.setState({loading: false, timeSlotList: []});
                message.error(error.response.data.message).then();
            });
    }

    saveApproveAppointment = () => {
        this.setState({loading: true});
        this.formRef.current.validateFields()
            .then((values) => {

                values.date = moment(values.date).format('YYYY-MM-DD');
                console.log("values", values)

                if (this.state.isReject) {
                    values.time = "8:00";
                    appointmentService.rejectAppointment(values).then(res => {
                        this.setState({loading: false, isVisibleModal: false});
                        if (200 === res.status || 201 === res.status) {
                            message.success("Successfully Rejected").then();
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
                } else {
                    appointmentService.acceptAppointment(values).then(res => {
                        this.setState({loading: false, isVisibleModal: false});
                        if (200 === res.status || 201 === res.status) {
                            message.success("Successfully Scheduled").then();
                            this.fetch();
                            // const {history, location, match} = this.props;
                            // history.push(`/consultant/appointments`);
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
                }

            })
            .catch((errorInfo) => {
                console.log("error", errorInfo)
                this.setState({loading: false});
            });

    }


    render() {
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
                                            scroll={{x: 1200, y: 300}}
                                        />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <div>
                    <Modal title="Appointmnet Details" centered
                           open={this.state.isVisibleModal}
                           onCancel={() => {
                               this.setState({isVisibleModal: false});
                           }}
                           afterClose={() => {
                               // this.afterCloseModal(this.formRef);
                           }}
                           width={500}
                           forceRender={true}
                        // style={{display: this.state.isHiddenModal ? 'none' : 'inline-block'}}
                           footer={[
                               <Button key="submit1"
                                       icon={<CloseOutlined/>}
                                       onClick={() => {
                                           this.setState({isVisibleModal: false});
                                       }}
                               >
                                   Cancel
                               </Button>,
                               <Button key="submit2"
                                       type="primary"
                                       loading={this.state.loading}
                                       icon={<SaveOutlined/>}
                                       onClick={() => {
                                           this.saveApproveAppointment();
                                       }}
                                   // disabled={!this.state.isFindCustomer}
                               >
                                   {this.state.isReject ? "Reject" : "Approve"}
                               </Button>,
                           ]}
                    >
                        <Form
                            labelCol={{span: 8}}
                            wrapperCol={{span: 16}}
                            name="userBlacklistDetailForm"
                            initialValues={{remember: true}}
                            autoComplete="off"
                            ref={this.formRef}
                        >
                            <Spin size="large" tip="Loading..." spinning={this.state.loading}>
                                <Row gutter={[16, 8]}>
                                    <Col hidden={true}>
                                        <Form.Item
                                            name="appointmentId"
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24} hidden={this.state.isReject}>
                                        <Form.Item label="Date"
                                                   name="date"
                                                   rules={[
                                                       {
                                                           required: !this.state.isReject,
                                                           message: "Please select date!",
                                                       }
                                                   ]}>
                                            <DatePicker style={{width: '100%'}}
                                                        disabledDate={(current) => {
                                                            return moment().add(-1, 'days') >= current;
                                                        }}
                                                        onChange={(value) => {
                                                            this.onChangeDate(value);
                                                        }}
                                            />
                                        </Form.Item>

                                    </Col>
                                    <Col span={24} hidden={this.state.isReject}>
                                        <Form.Item label="Time"
                                                   name="time"
                                                   rules={[
                                                       {
                                                           required: !this.state.isReject,
                                                           message: "Please select time!",
                                                       },
                                                   ]}>
                                            <Select
                                                showSearch
                                                style={{width: "100%"}}
                                                placeholder="Select time"
                                                optionFilterProp="children"
                                            >
                                                <OptGroup label="Active">
                                                    {this.state.timeSlotList?.map(
                                                        (item, index) => (
                                                            <Option
                                                                style={{color: item.isNotAvailable ?"gray" : "green"}}
                                                                key={"optActive" + index}
                                                                value={item.value}
                                                                disabled={item.isNotAvailable}
                                                            >
                                                                {item.label}
                                                            </Option>
                                                        )
                                                    )}
                                                </OptGroup>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24} hidden={this.state.isReject}>
                                        <Form.Item label="Special Note"
                                                   name="specialNote"
                                        >
                                            <TextArea style={{width: "100%"}}
                                                      placeholder="Special Note"
                                            />
                                        </Form.Item>

                                    </Col>

                                    <Col span={24} hidden={!this.state.isReject}>
                                        <Form.Item label="Reject Reason"
                                                   name="rejectReason"
                                                   rules={[
                                                       {
                                                           required: this.state.isReject,
                                                           message: "Please enter reject reason!",
                                                       },
                                                   ]}
                                        >
                                            <TextArea style={{width: "100%"}}
                                                      placeholder="Reject Reason"
                                            />
                                        </Form.Item>

                                    </Col>
                                </Row>
                            </Spin>

                        </Form>
                    </Modal>
                </div>
            </div>
        );
    }
}
