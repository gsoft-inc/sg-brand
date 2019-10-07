import { Button, Ref } from "semantic-ui-react";
import { CancelIcon } from "@orbit-ui/icons";
import { InputCalendarIcon } from "./assets";
import { KEYS, isNullOrEmpty, useHandlerProxy } from "@orbit-ui/react-components-shared";
import { PureComponent, createRef } from "react";
import { bool, func, node, string } from "prop-types";
import { isNil } from "lodash";
import cx from "classnames";

export class DatePickerTextboxInput extends PureComponent {
    static propTypes = {
        value: string.isRequired,
        onOpen: func,
        onClose: func,
        onBoundingClientRectChange: func,
        onClick: func,
        onKeyDown: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onFocus: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onBlur: func,
        // eslint-disable-next-line react/no-unused-prop-types
        onClear: func,
        allowClear: bool,
        placeholder: string,
        icon: node,
        clearIcon: node,
        disabledIcon: node,
        disabled: bool,
        open: bool,
        className: string
    };

    static defaultProps = {
        icon: <InputCalendarIcon className="w6 h6 fill-marine-700" />,
        clearIcon: <CancelIcon className="h3 w3" />,
        disabledIcon: <InputCalendarIcon className="w6 h6 fill-cloud-500" />,
        placeholder: "Pick a date"
    };

    _containerRef = null;
    _clearButtonRef = createRef();

    isPlaceholder() {
        const { value } = this.props;

        return isNullOrEmpty(value);
    }

    setContainerRef = ref => {
        const { onBoundingClientRectChange } = this.props;

        this._containerRef = ref;

        if (!isNil(ref)) {
            if (!isNil(onBoundingClientRectChange)) {
                setTimeout(() => {
                    if (!isNil(ref)) {
                        onBoundingClientRectChange(ref.getBoundingClientRect(), this.props);
                    }
                }, 0);
            }
        }
    };

    handleClick = event => {
        const { onClick, onOpen, onClose, allowClear, disabled, open } = this.props;

        let canPropagate = true;

        if (allowClear) {
            canPropagate = !this._clearButtonRef.current.contains(event.target);
        }

        if (canPropagate) {
            if (!isNil(onClick)) {
                onClick(event, this.props);
            }

            if (!disabled) {
                if (!open) {
                    onOpen(event, this.props);
                } else {
                    onClose(event, this.props);
                }

            }
        }
    };

    handleKeyDown = event => {
        const { onKeyDown, onOpen, onClear, disabled, open } = this.props;

        if (!disabled) {
            const key = event.keyCode;

            if (key === KEYS.space || key === KEYS.enter) {
                if (key === KEYS.space) {
                    event.preventDefault();
                }

                if (!open) {
                    onOpen(event, this.props);
                }
            } else if (key === KEYS.esc) {
                if (!open) {
                    onClear(event, this.props);
                }
            }
        }

        if (!isNil(onKeyDown)) {
            onKeyDown(event, this.props);
        }
    }

    handleFocus = useHandlerProxy(this, "onFocus");
    handleBlur = useHandlerProxy(this, "onBlur");
    handleClearButtonClick = useHandlerProxy(this, "onClear");

    getCssClasses() {
        const { disabled, open, className } = this.props;

        const mainClasses = cx({ " hover-b--marine-600 hover-marine-600 pointer" : !disabled });
        const openedClasses = open && !disabled ? " b--marine-600 marine-600" : " b--cloud-200 marine-200";
        const disabledClasses = cx({ " bg-cloud-100 cloud-400 crsr-not-allowed": disabled });
        const placeholderClasses = cx({ " marine-700": !this.isPlaceholder() && !disabled });

        const defaultClasses = `input pv3 ph4 ba outline-0 f6 h9 br2 flex items-center${mainClasses}${openedClasses}${placeholderClasses}${disabledClasses}`;

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    renderIcon() {
        const { icon, disabledIcon, disabled } = this.props;

        return disabled ? disabledIcon : icon;
    }

    renderClearButton() {
        const { allowClear, clearIcon, disabled, open } = this.props;

        if (!allowClear) {
            return null;
        }

        return (
            <div className={cx({ dn: this.isPlaceholder() || disabled || open })}>
                <Ref innerRef={this._clearButtonRef}>
                    <Button
                        circular
                        size="mini"
                        primary
                        icon
                        className="transparent"
                        onClick={this.handleClearButtonClick}
                        type="button"
                        data-testid="date-picker-textbox-clear-button"
                    >
                        {clearIcon}
                    </Button>
                </Ref>
            </div>
        );
    }

    render() {
        const { value, placeholder, disabled } = this.props;

        return <div
            onClick={this.handleClick}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleFocus}
            onBlur={this.handlerBlur}
            className={this.getCssClasses()}
            tabIndex="0"
            autoComplete="off"
            disabled={disabled}
            ref={this.setContainerRef}
            data-testid="date-picker-textbox-input"
        >
            {this.renderIcon()}
            <span className="flex-grow-1 ml4" data-testid="date-picker-textbox-input-value">{this.isPlaceholder() ? placeholder : value}</span>
            {this.renderClearButton()}

            <style jsx>{`
                .input:not("disabled") {
                    cursor: text;
                }

                .input:focus {
                    border: 1px solid var(--marine-700);
                    color: var(--marine-700);
                }
            `}</style>
        </div>;
    }

    // This method is part of the component external API.
    focus() {
        if (!isNil(this._containerRef)) {
            this._containerRef.focus();
        }
    }
}
