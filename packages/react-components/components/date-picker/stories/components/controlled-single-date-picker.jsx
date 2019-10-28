import { PureComponent } from "react";
import { SingleDatePicker } from "@orbit-ui/react-date-picker/src";
import { bool } from "prop-types";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";
import moment from "moment";

export class ControlledSingleDatePicker extends PureComponent {
    static propTypes = {
        date: momentType,
        open: bool
    };

    static defaultProps = {
        open: false
    };

    state = {
        date: this.props.date,
        open: this.props.open
    };

    handleDateChange = (event, date) => {
        const { onDateChange } = this.props;

        this.setState({ date });
        onDateChange(event, date);
    };

    handleVisibilityChange = (event, open) => {
        this.setState({ open });
    };

    render() {
        const { date, open } = this.state;

        return (
            <>
                <div className="mb1"><span className="fw6" style={{ width: "80px", display: "inline-block" }}>date:</span> {isNil(date) ? "null" : moment(date).format("YYYY-MM-DD")}</div>
                <div className="mb1"><span className="fw6" style={{ width: "80px", display: "inline-block" }}>open:</span> {open ? "true" : "false"}</div>
                <br /><br />
                <SingleDatePicker
                    { ...this.state }
                    onDateChange={this.handleDateChange}
                    onVisibilityChange={this.handleVisibilityChange}
                />
            </>
        );
    }
}
