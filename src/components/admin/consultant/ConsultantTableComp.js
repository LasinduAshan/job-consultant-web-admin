import React from "react";
import {Avatar, Button, Card, Col, List, message, Modal, Row, Space, Table, Tag} from 'antd';
import consultantService from "../../../service/ConsultantService";
import {EditOutlined, FileDoneOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import moment from "moment";


export class ConsultantTableComp extends React.Component {

    columns: any = [
        {
            title: "Name",
            dataIndex: "firstName",
            key: "firstName",
            width: 150,
            render: (text: any, record: any) => (
                <>
                    {/*<Avatar.Group>*/}
                    {/*    <Avatar*/}
                    {/*        className="shape-avatar"*/}
                    {/*        shape="square"*/}
                    {/*        size={40}*/}
                    {/*        src={face2}*/}
                    {/*    ></Avatar>*/}
                    <div className="avatar-info">
                        <h6>{record.firstName + " " + record.lastName}</h6>
                        <p>{record.email}</p>
                    </div>
                    {/*</Avatar.Group>{" "}*/}
                </>
            )
        },
        {
            title: "Job Type",
            dataIndex: "jobType",
            key: "jobType",
            width: 100,
            /*render: (text: any, record: any) => (
                <>
                    <div className="author-info">
                        <h6>{record.jobType}</h6>
                        {/!*<p>Organization</p>*!/}
                    </div>
                </>
            )*/
        },
        {
            title: "Country",
            dataIndex: "country",
            width: 100,
            key: 'country'
        },
        {
            title: "ID Number",
            dataIndex: "idNo",
            width: 100,
            key: 'idNo'
        },
        {
            title: "Contact Number",
            dataIndex: "contactNo",
            width: 100,
            key: 'contactNo'
        },
        {
            title: "Record Status",
            key: "recordStatus",
            dataIndex: "recordStatus",
            align: 'center',
            width: 100,
            render(text: string) {
                if (text == 'ACTIVE') {
                    return {
                        children: <Space size="small"><Tag color='blue'>{text}</Tag></Space>
                    }
                }else if (text == 'INACTIVE') {
                    return {
                        children: <Space size="small"><Tag color='red'>{text}</Tag></Space>
                    }
                }else {
                    return {
                        children: <Space size="small"><Tag color='orange'>{text}</Tag></Space>
                    }
                }
            }
        },
        {
            title: "Created Date/Time",
            dataIndex: "createdDate",
            width: 150,
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
            width: 150,
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
            align: 'center',
            width: 100,
            render: (text: any, record: any) => (
                /*<List size={"small"} style={{marginLeft: '8px'}}>
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
                        <Button style={{border: 'none', height: 20}} size={"small"}
                                icon={<FileDoneOutlined style={{fontSize: 15}}/>}
                                onClick={() => {
                                    this.onClickDeleteConsultant(record.consultantId);
                                }}
                        >Delete
                        </Button>
                    </li>
                </List>*/

                <div
                    style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContents: 'center'}}>
                    <Link to={{
                        pathname: `/admin/consultant-form/${record.consultantId}`,
                        state: record,
                        // hash: "edit"
                    }}>
                        <Button style={{border: 'none', height: 30}} size={"small"}
                                icon={<EditOutlined style={{fontSize: 15}}/>}
                        >Edit
                        </Button>
                    </Link>
                    <Button style={{border: 'none', height: 30}} size={"small"}
                            icon={<FileDoneOutlined style={{fontSize: 15}}/>}
                            onClick={() => {
                                this.onClickDeleteConsultant(record.consultantId);
                            }}
                    >Delete
                    </Button>
                </div>


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
            loading: false,
        };
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = () => {
        this.setState({loading: true});
        return consultantService.getAllConsultants().then(res => {
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

    onClickDeleteConsultant = (consultantId) => {
        this.setState({loading: true});
        Modal.confirm({
            title: "Do you want to delete this consultant details?",
            content: "When clicked the OK button, this consultant detail record will be deleted",
            onOk: () => {
                return consultantService.deleteConsultant(consultantId).then(res => {
                    this.setState({loading: false});
                    if (200 === res.status || 201 === res.status) {
                        message.success("Successfully Deleted").then();
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
