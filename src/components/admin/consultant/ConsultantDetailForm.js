import React, {Component} from 'react';
import {Button, Card, Col, Form, Input, InputNumber, message, Modal, Row, Select, Space, Spin, Switch} from 'antd';
import AvailabilityDto from "../../../dto/AvailabilityDto";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {FormInstance} from "antd";
import {Link} from "react-router-dom";
import consultantService from "../../../service/ConsultantService";
import {withRouter} from 'react-router-dom';
import availabilityDto from "../../../dto/AvailabilityDto";
import authService from "../../../service/auth/AuthService";

const {Option, OptGroup} = Select;


/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

/* eslint-enable no-template-curly-in-string */


class ConsultantDetailForm extends Component {

    // formRef= React.createRef<FormInstance>();

    countryList: any = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo, Democratic Republic of the",
        "Congo, Republic of the",
        "Costa Rica",
        "Cote d'Ivoire",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini (formerly Swaziland)",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea, North",
        "Korea, South",
        "Kosovo",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Sri Lanka"
    ];

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isEdit: false,
            timeSlotList: [],
            consultantDto: {
                consultantId: null,
                firstName: "",
                lastName: "",
                email: "",
                idNo: "",
                contactNo: null,
                jobType: "",
                country: "",
                password: "",
                appointmentDetailDtoList: [],
                availabilityDtoList: [
                    {
                        isWorkDay: false,
                        day: "SUNDAY",
                        startHour: "01",
                        startMinutes: "00",
                        endHour: "01",
                        endMinutes: "00"
                    },
                    {
                        isWorkDay: false,
                        day: "MONDAY",
                        startHour: "01",
                        startMinutes: "00",
                        endHour: "01",
                        endMinutes: "00"
                    },
                    {
                        isWorkDay: false,
                        day: "TUESDAY",
                        startHour: "01",
                        startMinutes: "00",
                        endHour: "01",
                        endMinutes: "00"
                    },
                    {
                        isWorkDay: false,
                        day: "WEDNESDAY",
                        startHour: "01",
                        startMinutes: "00",
                        endHour: "01",
                        endMinutes: "00"
                    },
                    {
                        isWorkDay: false,
                        day: "THURSDAY",
                        startHour: "01",
                        startMinutes: "00",
                        endHour: "01",
                        endMinutes: "00"
                    },
                    {
                        isWorkDay: false,
                        day: "FRIDAY",
                        startHour: "01",
                        startMinutes: "00",
                        endHour: "01",
                        endMinutes: "00"
                    },
                    {
                        isWorkDay: false,
                        day: "SATURDAY",
                        startHour: "01",
                        startMinutes: "00",
                        endHour: "01",
                        endMinutes: "00"
                    }
                ],
            }
        };
        this.formRef = React.createRef();
    }


    componentDidMount() {
        const {history, location, match} = this.props;
        let id: number = parseInt(match.params.consultantId);
        console.log("user iddddd", id);


        if (id !== 0) {
            this.setState({isEdit: true});
            this.getConsultantById(id);
        }

        this.setInitialAvailabilityList();

    }

    getConsultantById = (consultantId) => {
        console.log(consultantId);
        this.setState({loading: true});
        return consultantService.getConsultantById(consultantId).then(res => {
            let data = res.data;
            console.log("data", data);
            if (200 === res.status || 201 === res.status) {

                this.setState({
                    consultantDto: data,
                    loading: false
                }, () => {
                    console.log("state dto", this.state.consultantDto);
                    this.formRef.current.setFieldsValue(this.state.consultantDto);
                });

            }
        }, (error: any) => {
            this.setState({loading: false});
            message.error(error.response.data.message).then();
        });
    };


    setInitialAvailabilityList() {
        if (!this.state.isEdit) {
            this.formRef.current.setFieldsValue({
                availabilityDtoList: this.state.consultantDto.availabilityDtoList
            });
        }
        if (0 === this.state.timeSlotList.length) {
            for (let i = 1; i < 25; i++) {
                this.state.timeSlotList.push({
                    value: i < 10 ? "0" + i : i + "",
                    label: i < 10 ? "0" + i : i + ""
                })
            }
        }
    }

    onFinish = (values) => {

        console.log(values);
        if (this.state.isEdit) {
            this.updateConsultant(values)
        } else {
            if (values.password !== values.reEnterPassword) {
                message.warning("The passwords you entered don't match. Please double-check and re-enter them.").then();
            } else {
                this.saveConsultant(values);
            }
        }

    };

    saveConsultant = (values) => {
        this.setState({loading: true});
        Modal.confirm({
            title: "Do you want to save this consultant details?",
            content: "When clicked the OK button, this consultant detail record will be saved",
            onOk: () => {
                return consultantService.saveConsultant(values).then(res => {
                    this.setState({loading: false});
                    if (200 === res.status || 201 === res.status) {
                        message.success("Successfully Saved").then();
                        this.formRef.current.resetFields();
                        const {history, location, match} = this.props;
                        history.push("/admin/consultants")
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
    };

    updateConsultant = (values) => {
        this.setState({loading: true});
        Modal.confirm({
            title: "Do you want to update this consultant details?",
            content: "When clicked the OK button, this consultant detail record will be updated",
            onOk: () => {
                return consultantService.updateConsultant(values).then(res => {
                    this.setState({loading: false});
                    if (200 === res.status || 201 === res.status) {
                        message.success("Successfully Updated").then();
                        this.formRef.current.resetFields();
                        const {history, location, match} = this.props;
                        history.push(`/admin/consultants`);
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
    };

    validateNic = (rule: any, value: any, callback: any) => {
        const idNo = this.formRef.current.getFieldValue('idNo');
        if (idNo == undefined || idNo == "") {
            callback("Please enter ID Number!");
        } else if (!/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/.test(idNo)) {
            callback("Invalid NIC format");
        } else {
            callback();
            this.formRef.current.setFieldsValue({idNo: idNo.toUpperCase()});
        }
    };

    validateContactNumber = (rule: any, value: any, callback: any) => {
        const contactNoRegex =
            /^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/;

        if (value == undefined || value == "") {
            callback("Please enter contact Number!");
        } else if (!contactNoRegex.test(value)) {
            callback("Invalid contact number");
        } else {
            callback();
        }
    };

    validateEmail = (rule: any, value: any, callback: any) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (value == undefined || value == "") {
            callback("Please enter email address!");
        } else if (!emailRegex.test(value)) {
            callback("Invalid email address");
        } else {
            callback();
        }
    };

    onChangeDayEnable = (value: boolean, index: number) => {
        let state = {...this.state};

        let availabilityDto = state.consultantDto.availabilityDtoList[index];
        availabilityDto.isWorkDay = value;
        this.setState({consultantDto: state.consultantDto});

        if (!value) {
            let availabilityDtoList = this.formRef.current.getFieldValue('availabilityDtoList');
            availabilityDtoList[index].startHour = "01";
            availabilityDtoList[index].startMinutes = "00";
            availabilityDtoList[index].endHour = "01";
        }
    };

    onChangeEndHour = (value: any, index: number) => {

        let availabilityDtoList = this.formRef.current.getFieldValue('availabilityDtoList');
        if (availabilityDtoList[index].startHour >= value) {
            message.warning("The end hour cannot be less than the start hour.").then()
        }
    };

    render() {
        return (
            <div>
                <Spin spinning={this.state.loading}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        style={{padding: 16}}
                    >
                        <Form
                            name="nest-messages"
                            onFinish={this.onFinish}
                            layout="vertical"
                            ref={this.formRef}
                            // style={{
                            //     maxWidth: 600,
                            // }}
                            validateMessages={validateMessages}
                        >
                            <Row gutter={[24, 2]} style={{marginTop: '6px'}}
                                 className={"mortgage-details"}>
                                <Col span={10}>
                                    <Row gutter={[12, 2]}>
                                        <Col span={24}>
                                            <h4>Personal Details</h4>
                                        </Col>
                                        <Col span={0}>
                                            <Form.Item
                                                name="consultantId"
                                            >
                                                <label/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="First Name"
                                                name="firstName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter first name!",
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder={"Enter first name"}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Last Name"
                                                name="lastName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter last name!",
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder={"Enter last name"}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[12, 2]}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Contact No."
                                                name="contactNo"
                                                rules={[
                                                    {validator: this.validateContactNumber}
                                                ]}
                                            >
                                                <Input
                                                    placeholder={"Enter contact no"}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="ID Number"
                                                name="idNo"
                                                rules={[
                                                    {validator: this.validateNic}
                                                ]}
                                            >
                                                <Input
                                                    placeholder={"Enter id number"}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[12, 2]}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Job Type"
                                                name="jobType"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please select job type!",
                                                    },
                                                ]}
                                            >
                                                <Select optionFilterProp="children"
                                                        showSearch
                                                        placeholder={"Select job type"}
                                                        size="large"
                                                        disabled={this.state.isEdit}
                                                >
                                                    <Option style={{color: "green"}}
                                                            value={"Accountant"}>{"Accountant"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Software Engineer"}>{"Software Engineer"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Marketing Manager"}>{"Marketing Manager"}</Option>
                                                    <Option style={{color: "green"}} value={"Nurse"}>{"Nurse"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Teacher"}>{"Teacher"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Graphic Designer"}>{"Graphic Designer"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Sales Representative"}>{"Sales Representative"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Data Analyst"}>{"Data Analyst"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Project Manager"}>{"Project Manager"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Financial Analyst"}>{"Financial Analyst"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Human Resources Manager"}>{"Human Resources Manager"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Customer Service Representative"}>{"Customer Service Representative"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Web Developer"}>{"Web Developer"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Registered Nurse (RN)"}>{"Registered Nurse (RN)"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Administrative Assistant"}>{"Administrative Assistant"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Product Manager"}>{"Product Manager"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Pharmacist"}>{"Pharmacist"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Electrician"}>{"Electrician"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Mechanical Engineer"}>{"Mechanical Engineer"}</Option>
                                                    <Option style={{color: "green"}} value={"Chef"}>{"Chef"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Social Media Manager"}>{"Social Media Manager"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Doctor"}>{"Doctor"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Legal Assistant"}>{"Legal Assistant"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Operations Manager"}>{"Operations Manager"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Photographer"}>{"Photographer"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Physical Therapist"}>{"Physical Therapist"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Account Manager"}>{"Account Manager"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Research Scientist"}>{"Research Scientist"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Architect"}>{"Architect"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Marketing Coordinator"}>{"Marketing Coordinator"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Financial Planner"}>{"Financial Planner"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Police Officer"}>{"Police Officer"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Software Developer"}>{"Software Developer"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Interior Designer"}>{"Interior Designer"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Sales Manager"}>{"Sales Manager"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Data Scientist"}>{"Data Scientist"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Construction Worker"}>{"Construction Worker"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Aerospace Engineer"}>{"Aerospace Engineer"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Event Planner"}>{"Event Planner"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"HR Specialist"}>{"HR Specialist"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Art Director"}>{"Art Director"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Project Coordinator"}>{"Project Coordinator"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Marketing Analyst"}>{"Marketing Analyst"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"IT Manager"}>{"IT Manager"}</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item
                                                label="Country"
                                                name="country"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please select country!",
                                                    },
                                                ]}
                                            >
                                                <Select optionFilterProp="children"
                                                        showSearch
                                                        placeholder={"Select country"}
                                                        size="large"
                                                        disabled={this.state.isEdit}
                                                >
                                                    {/*<Option style={{color: "green"}}
                                                            value={"Australia"}>{"Australia"}</Option>
                                                    <Option style={{color: "green"}}
                                                            value={"Sri Lanka"}>{"Sri Lanka"}</Option>*/}

                                                    {this.countryList.map((country, index) => (
                                                        <option key={index} style={{color: "green"}}
                                                                value={country}>{country}</option>
                                                    ))}

                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[12, 2]}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Email"
                                                name="email"
                                                rules={[
                                                    {validator: this.validateEmail}
                                                ]}
                                            >
                                                <Input
                                                    disabled={this.state.isEdit}
                                                    placeholder={"Enter email"}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[12, 2]}>
                                        <Col span={12} hidden={this.state.isEdit}>
                                            <Form.Item
                                                label="Password"
                                                name="password"
                                                rules={[
                                                    {
                                                        required: !this.state.isEdit,
                                                        message: "Please enter password!",
                                                    },
                                                ]}
                                            >
                                                <Input.Password size="small"
                                                                placeholder={"Enter password"}
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col span={12} hidden={this.state.isEdit}>
                                            <Form.Item
                                                label="Re Enter Password"
                                                name="reEnterPassword"
                                                rules={[
                                                    {
                                                        required: !this.state.isEdit,
                                                        message: "Please re enter password!",
                                                    },
                                                ]}
                                            >
                                                <Input.Password size="small"
                                                                placeholder={"Enter re enter password"}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                </Col>
                                <Col span={14} style={{borderLeft: '1px solid #e0e0e0'}}>
                                    <Row gutter={[12, 2]} style={{marginBottom: 16}} className="time-slot-lbl">
                                        <Col span={24}>
                                            <h4>Availability Time Slots</h4>
                                        </Col>
                                        <Col span={4} offset={2} style={{textAlign: 'left'}}>
                                            <label>Day</label>
                                        </Col>
                                        <Col span={4}>
                                            <label>Hour</label>
                                        </Col>
                                        <Col span={4}>
                                            <label>Minutes</label>
                                        </Col>

                                        <Col span={2}>
                                        </Col>

                                        <Col span={4}>
                                            <label>Hour</label>
                                        </Col>
                                        <Col span={4}>
                                            <label>Minutes</label>
                                        </Col>
                                    </Row>

                                    <Form.List name="availabilityDtoList">
                                        {(fields, {add, remove}) => {
                                            return (
                                                <div>
                                                    {fields.map((field, index) => (
                                                        <div key={field.key}>
                                                            <Row key={field.key} gutter={[8, 4]}
                                                                 className={"row-separate-bottom-line time-slot-form"}>
                                                                <Col span={2}>
                                                                    <Form.Item
                                                                        name={[index, "isWorkDay"]}
                                                                        className="package__switch"
                                                                        valuePropName="checked"
                                                                    >
                                                                        <Switch
                                                                            checkedChildren={<CheckOutlined/>}
                                                                            unCheckedChildren={<CloseOutlined/>}
                                                                            onChange={value => {
                                                                                this.onChangeDayEnable(value, index);
                                                                            }}
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={4} style={{paddingTop: 4}}>
                                                                <span style={{marginTop: 4}}>
                                                                    {this.state.consultantDto?.availabilityDtoList[index]?.day}
                                                                </span>

                                                                </Col>

                                                                <Col span={4}>
                                                                    <Form.Item
                                                                        className={"custom-form-row-width"}
                                                                        name={[index, "startHour"]}
                                                                        rules={[{required: false}]}
                                                                    >
                                                                        <Select optionFilterProp="children"
                                                                                showSearch
                                                                                disabled={!this.state.consultantDto?.availabilityDtoList[index]?.isWorkDay}
                                                                        >
                                                                            <OptGroup label="Active">
                                                                                {
                                                                                    this.state.timeSlotList.map((item, index) =>
                                                                                        <Option
                                                                                            style={{color: "green"}}
                                                                                            key={'optActive' + index}
                                                                                            value={item.value}>{item.label}
                                                                                        </Option>)
                                                                                }
                                                                            </OptGroup>
                                                                        </Select>
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={4}>
                                                                    <Form.Item
                                                                        name={[index, "startMinutes"]}>
                                                                        <Select
                                                                            disabled={!this.state.consultantDto?.availabilityDtoList[index]?.isWorkDay}
                                                                        >
                                                                            <Option
                                                                                style={{color: "green"}}
                                                                                key={'optActive' + index}
                                                                                value={"00"}>{"00"}
                                                                            </Option>
                                                                            <Option
                                                                                style={{color: "green"}}
                                                                                key={'optActive' + index}
                                                                                value={"30"}>{"30"}
                                                                            </Option>

                                                                        </Select>
                                                                    </Form.Item>

                                                                </Col>
                                                                <Col span={2}
                                                                     style={{textAlign: 'center', paddingTop: 4}}>
                                                                    <label style={{marginTop: 4}}>to</label>
                                                                </Col>
                                                                <Col span={4}>
                                                                    <Form.Item
                                                                        className={"custom-form-row-width"}
                                                                        name={[index, "endHour"]}
                                                                        rules={[{required: false}]}
                                                                    >
                                                                        <Select optionFilterProp="children"
                                                                                showSearch
                                                                                disabled={!this.state.consultantDto?.availabilityDtoList[index]?.isWorkDay}
                                                                                onChange={value => {
                                                                                    this.onChangeEndHour(value, index);
                                                                                }}
                                                                        >
                                                                            <OptGroup label="Active">
                                                                                {
                                                                                    this.state.timeSlotList.map((item, index) =>
                                                                                        <Option
                                                                                            style={{color: "green"}}
                                                                                            key={'optActive' + index}
                                                                                            value={item.value}>{item.label}
                                                                                        </Option>)
                                                                                }
                                                                            </OptGroup>
                                                                        </Select>
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={4}
                                                                     className={"uploaded-doc-info"}>
                                                                    <Form.Item
                                                                        className={"custom-form-row-width"}
                                                                        name={[index, "endMinutes"]}
                                                                    >
                                                                        <Select
                                                                            disabled={!this.state.consultantDto?.availabilityDtoList[index]?.isWorkDay}
                                                                        >
                                                                            <Option
                                                                                style={{color: "green"}}
                                                                                key={'optActive' + index}
                                                                                value={"00"}>{"00"}
                                                                            </Option>
                                                                            <Option
                                                                                style={{color: "green"}}
                                                                                key={'optActive' + index}
                                                                                value={"30"}>{"30"}
                                                                            </Option>
                                                                        </Select>
                                                                    </Form.Item>
                                                                </Col>

                                                                <Col span={0}>
                                                                    <Form.Item
                                                                        name={[index, "availabilityId"]}
                                                                    >
                                                                        <label/>
                                                                    </Form.Item>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        }}
                                    </Form.List>
                                </Col>
                            </Row>

                            <Row justify="end">
                                <Space>
                                    <Link to={`/admin/consultants`}>
                                        <Button className=" btn--right">Cancel</Button>
                                    </Link>
                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                    >
                                        {this.state.isEdit ? "Update Consultant" : "Save Consultant"}
                                    </Button>
                                </Space>
                            </Row>
                        </Form>
                    </Card>
                </Spin>
            </div>
        );
    }
}

export default ConsultantDetailForm;
