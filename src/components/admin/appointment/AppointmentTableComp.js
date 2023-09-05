import React from "react";
import {Avatar, Button, Card, Col, List, message, Row, Space, Table, Tag} from 'antd';
import face2 from "../../../assets/images/face-2.jpg";
import face3 from "../../../assets/images/face-3.jpg";
import face from "../../../assets/images/face-1.jpg";
import face4 from "../../../assets/images/face-4.jpg";
import face5 from "../../../assets/images/face-5.jpeg";
import face6 from "../../../assets/images/face-6.jpeg";
import Title from "antd/es/skeleton/Title";
import consultantService from "../../../service/ConsultantService";
import {EditOutlined, FileDoneOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import appointmentService from "../../../service/AppointmentService";


export class AppointmentTableComp extends React.Component {

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
           /* render: (text: any, record: any) => (
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
            width: 20,
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
            loading: false,
        };
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = () => {
        this.setState({loading: true});
        return appointmentService.getAllAppointmentsForAdmin().then(res => {
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
                                            scroll={{x: 1200, y: 300}}
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
