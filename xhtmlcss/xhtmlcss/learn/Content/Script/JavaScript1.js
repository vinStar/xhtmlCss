﻿(function (e) {
    e.extend(e.fn, {
        validate: function (t) {
            if (!this.length) {
                t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.");
                return
            }
            var n = e.data(this[0], "validator");
            return n ? n : (this.attr("novalidate", "novalidate"), n = new e.validator(t, this[0]), e.data(this[0], "validator", n), n.settings.onsubmit && (this.validateDelegate(":submit", "click", function (t) {
                n.settings.submitHandler && (n.submitButton = t.target), e(t.target).hasClass("cancel") && (n.cancelSubmit = !0), e(t.target).attr("formnovalidate") !== undefined && (n.cancelSubmit = !0)
            }), this.submit(function (t) {
                function r() {
                    var r;
                    return n.settings.submitHandler ? (n.submitButton && (r = e("<input type='hidden'/>").attr("name", n.submitButton.name).val(e(n.submitButton).val()).appendTo(n.currentForm)), n.settings.submitHandler.call(n, n.currentForm, t), n.submitButton && r.remove(), !1) : !0
                }
                return n.settings.debug && t.preventDefault(), n.cancelSubmit ? (n.cancelSubmit = !1, r()) : n.form() ? n.pendingRequest ? (n.formSubmitted = !0, !1) : r() : (n.focusInvalid(), !1)
            })), n)
        },
        valid: function () {
            if (e(this[0]).is("form")) return this.validate().form();
            var t = !0,
				n = e(this[0].form).validate();
            return this.each(function () {
                t = t && n.element(this)
            }), t
        },
        removeAttrs: function (t) {
            var n = {},
				r = this;
            return e.each(t.split(/\s/), function (e, t) {
                n[t] = r.attr(t), r.removeAttr(t)
            }), n
        },
        rules: function (t, n) {
            var r = this[0];
            if (t) {
                var i = e.data(r.form, "validator").settings,
					s = i.rules,
					o = e.validator.staticRules(r);
                switch (t) {
                    case "add":
                        e.extend(o, e.validator.normalizeRule(n)), delete o.messages, s[r.name] = o, n.messages && (i.messages[r.name] = e.extend(i.messages[r.name], n.messages));
                        break;
                    case "remove":
                        if (!n) return delete s[r.name], o;
                        var u = {};
                        return e.each(n.split(/\s/), function (e, t) {
                            u[t] = o[t], delete o[t]
                        }), u
                }
            }
            var a = e.validator.normalizeRules(e.extend({}, e.validator.classRules(r), e.validator.attributeRules(r), e.validator.dataRules(r), e.validator.staticRules(r)), r);
            if (a.required) {
                var f = a.required;
                delete a.required, a = e.extend({
                    required: f
                }, a)
            }
            return a
        }
    }), e.extend(e.expr[":"], {
        blank: function (t) {
            return !e.trim("" + e(t).val())
        },
        filled: function (t) {
            return !!e.trim("" + e(t).val())
        },
        unchecked: function (t) {
            return !e(t).prop("checked")
        }
    }), e.validator = function (t, n) {
        this.settings = e.extend(!0, {}, e.validator.defaults, t), this.currentForm = n, this.init()
    }, e.validator.format = function (t, n) {
        return arguments.length === 1 ? function () {
            var n = e.makeArray(arguments);
            return n.unshift(t), e.validator.format.apply(this, n)
        } : (arguments.length > 2 && n.constructor !== Array && (n = e.makeArray(arguments).slice(1)), n.constructor !== Array && (n = [n]), e.each(n, function (e, n) {
            t = t.replace(new RegExp("\\{" + e + "\\}", "g"), function () {
                return n
            })
        }), t)
    }, e.extend(e.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: !0,
            errorContainer: e([]),
            errorLabelContainer: e([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function (e, t) {
                this.lastActive = e, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(e)).hide())
            },
            onfocusout: function (e, t) {
                !this.checkable(e) && (e.name in this.submitted || !this.optional(e)) && this.element(e)
            },
            onkeyup: function (e, t) {
                if (t.which === 9 && this.elementValue(e) === "") return;
                (e.name in this.submitted || e === this.lastElement) && this.element(e)
            },
            onclick: function (e, t) {
                e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
            },
            highlight: function (t, n, r) {
                t.type === "radio" ? this.findByName(t.name).addClass(n).removeClass(r) : e(t).addClass(n).removeClass(r)
            },
            unhighlight: function (t, n, r) {
                t.type === "radio" ? this.findByName(t.name).removeClass(n).addClass(r) : e(t).removeClass(n).addClass(r)
            }
        },
        setDefaults: function (t) {
            e.extend(e.validator.defaults, t)
        },
        messages: {
            required: "必选字段",
            remote: "请修正该字段",
            email: "请输入正确格式的电子邮件",
            url: "请输入合法的网址",
            date: "请输入合法的日期",
            dateISO: "请输入合法的日期 (ISO).",
            number: "请输入合法的数字",
            digits: "只能输入整数",
            creditcard: "请输入合法的信用卡号",
            equalTo: "请再次输入相同的值",
            accept: "请输入拥有合法后缀名的字符串",
            maxlength: e.validator.format("请输入一个长度最多是 {0} 的字符串"),
            minlength: e.validator.format("请输入一个长度最少是 {0} 的字符串"),
            rangelength: e.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
            range: e.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
            max: e.validator.format("请输入一个最大为 {0} 的值"),
            min: e.validator.format("请输入一个最小为 {0} 的值")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function () {
                function r(t) {
                    var n = e.data(this[0].form, "validator"),
						r = "on" + t.type.replace(/^validate/, "");
                    n.settings[r] && n.settings[r].call(n, this[0], t)
                }
                this.labelContainer = e(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm), this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var t = this.groups = {};
                e.each(this.settings.groups, function (n, r) {
                    typeof r == "string" && (r = r.split(/\s/)), e.each(r, function (e, r) {
                        t[r] = n
                    })
                });
                var n = this.settings.rules;
                e.each(n, function (t, r) {
                    n[t] = e.validator.normalizeRule(r)
                }), e(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", r).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", r), this.settings.invalidHandler && e(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function () {
                return this.checkForm(), e.extend(this.submitted, this.errorMap), this.invalid = e.extend({}, this.errorMap), this.valid() || e(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function () {
                this.prepareForm();
                for (var e = 0, t = this.currentElements = this.elements() ; t[e]; e++) this.check(t[e]);
                return this.valid()
            },
            element: function (t) {
                t = this.validationTargetFor(this.clean(t)), this.lastElement = t, this.prepareElement(t), this.currentElements = e(t);
                var n = this.check(t) !== !1;
                return n ? delete this.invalid[t.name] : this.invalid[t.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), n
            },
            showErrors: function (t) {
                if (t) {
                    e.extend(this.errorMap, t), this.errorList = [];
                    for (var n in t) this.errorList.push({
                        message: t[n],
                        element: this.findByName(n)[0]
                    });
                    this.successList = e.grep(this.successList, function (e) {
                        return !(e.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function () {
                e.fn.resetForm && e(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
            },
            numberOfInvalids: function () {
                return this.objectLength(this.invalid)
            },
            objectLength: function (e) {
                var t = 0;
                for (var n in e) t++;
                return t
            },
            hideErrors: function () {
                this.addWrapper(this.toHide).hide()
            },
            valid: function () {
                return this.size() === 0
            },
            size: function () {
                return this.errorList.length
            },
            focusInvalid: function () {
                if (this.settings.focusInvalid) try {
                    e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (t) { }
            },
            findLastActive: function () {
                var t = this.lastActive;
                return t && e.grep(this.errorList, function (e) {
                    return e.element.name === t.name
                }).length === 1 && t
            },
            elements: function () {
                var t = this,
					n = {};
                return e(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                    return !this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in n || !t.objectLength(e(this).rules()) ? !1 : (n[this.name] = !0, !0)
                })
            },
            clean: function (t) {
                return e(t)[0]
            },
            errors: function () {
                var t = this.settings.errorClass.replace(" ", ".");
                return e(this.settings.errorElement + "." + t, this.errorContext)
            },
            reset: function () {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = e([]), this.toHide = e([]), this.currentElements = e([])
            },
            prepareForm: function () {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function (e) {
                this.reset(), this.toHide = this.errorsFor(e)
            },
            elementValue: function (t) {
                var n = e(t).attr("type"),
					r = e(t).val();
                return n === "radio" || n === "checkbox" ? e("input[name='" + e(t).attr("name") + "']:checked").val() : typeof r == "string" ? r.replace(/\r/g, "") : r
            },
            check: function (t) {
                t = this.validationTargetFor(this.clean(t));
                var n = e(t).rules(),
					r = !1,
					i = this.elementValue(t),
					s;
                for (var o in n) {
                    var u = {
                        method: o,
                        parameters: n[o]
                    };
                    try {
                        s = e.validator.methods[o].call(this, i, t, u.parameters);
                        if (s === "dependency-mismatch") {
                            r = !0;
                            continue
                        }
                        r = !1;
                        if (s === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(t));
                            return
                        }
                        if (!s) return this.formatAndAdd(t, u), !1
                    } catch (a) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + u.method + "' method.", a), a
                    }
                }
                if (r) return;
                return this.objectLength(n) && this.successList.push(t), !0
            },
            customDataMessage: function (t, n) {
                return e(t).data("msg-" + n.toLowerCase()) || t.attributes && e(t).attr("data-msg-" + n.toLowerCase())
            },
            customMessage: function (e, t) {
                var n = this.settings.messages[e];
                return n && (n.constructor === String ? n : n[t])
            },
            findDefined: function () {
                for (var e = 0; e < arguments.length; e++)
                    if (arguments[e] !== undefined) return arguments[e];
                return undefined
            },
            defaultMessage: function (t, n) {
                return this.findDefined(this.customMessage(t.name, n), this.customDataMessage(t, n), !this.settings.ignoreTitle && t.title || undefined, e.validator.messages[n], "<strong>Warning: No message defined for " + t.name + "</strong>")
            },
            formatAndAdd: function (t, n) {
                var r = this.defaultMessage(t, n.method),
					i = /\$?\{(\d+)\}/g;
                typeof r == "function" ? r = r.call(this, n.parameters, t) : i.test(r) && (r = e.validator.format(r.replace(i, "{$1}"), n.parameters)), this.errorList.push({
                    message: r,
                    element: t
                }), this.errorMap[t.name] = r, this.submitted[t.name] = r
            },
            addWrapper: function (e) {
                return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))), e
            },
            defaultShowErrors: function () {
                var e, t;
                for (e = 0; this.errorList[e]; e++) {
                    var n = this.errorList[e];
                    this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass), this.showLabel(n.element, n.message)
                }
                this.errorList.length && (this.toShow = this.toShow.add(this.containers));
                if (this.settings.success)
                    for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
                if (this.settings.unhighlight)
                    for (e = 0, t = this.validElements() ; t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function () {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function () {
                return e(this.errorList).map(function () {
                    return this.element
                })
            },
            showLabel: function (t, n) {
                var r = this.errorsFor(t);
                r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), r.html(n)) : (r = e("<" + this.settings.errorElement + ">").attr("for", this.idOrName(t)).addClass(this.settings.errorClass).html(n || ""), this.settings.wrapper && (r = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(r).length || (this.settings.errorPlacement ? this.settings.errorPlacement(r, e(t)) : r.insertAfter(t))), !n && this.settings.success && (r.text(""), typeof this.settings.success == "string" ? r.addClass(this.settings.success) : this.settings.success(r, t)), this.toShow = this.toShow.add(r)
            },
            errorsFor: function (t) {
                var n = this.idOrName(t);
                return this.errors().filter(function () {
                    return e(this).attr("for") === n
                })
            },
            idOrName: function (e) {
                return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
            },
            validationTargetFor: function (e) {
                return this.checkable(e) && (e = this.findByName(e.name).not(this.settings.ignore)[0]), e
            },
            checkable: function (e) {
                return /radio|checkbox/i.test(e.type)
            },
            findByName: function (t) {
                return e(this.currentForm).find("[name='" + t + "']")
            },
            getLength: function (t, n) {
                switch (n.nodeName.toLowerCase()) {
                    case "select":
                        return e("option:selected", n).length;
                    case "input":
                        if (this.checkable(n)) return this.findByName(n.name).filter(":checked").length
                }
                return t.length
            },
            depend: function (e, t) {
                return this.dependTypes[typeof e] ? this.dependTypes[typeof e](e, t) : !0
            },
            dependTypes: {
                "boolean": function (e, t) {
                    return e
                },
                string: function (t, n) {
                    return !!e(t, n.form).length
                },
                "function": function (e, t) {
                    return e(t)
                }
            },
            optional: function (t) {
                var n = this.elementValue(t);
                return !e.validator.methods.required.call(this, n, t) && "dependency-mismatch"
            },
            startRequest: function (e) {
                this.pending[e.name] || (this.pendingRequest++, this.pending[e.name] = !0)
            },
            stopRequest: function (t, n) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[t.name], n && this.pendingRequest === 0 && this.formSubmitted && this.form() ? (e(this.currentForm).submit(), this.formSubmitted = !1) : !n && this.pendingRequest === 0 && this.formSubmitted && (e(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function (t) {
                return e.data(t, "previousValue") || e.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function (t, n) {
            t.constructor === String ? this.classRuleSettings[t] = n : e.extend(this.classRuleSettings, t)
        },
        classRules: function (t) {
            var n = {},
				r = e(t).attr("class");
            return r && e.each(r.split(" "), function () {
                this in e.validator.classRuleSettings && e.extend(n, e.validator.classRuleSettings[this])
            }), n
        },
        attributeRules: function (t) {
            var n = {},
				r = e(t),
				i = r[0].getAttribute("type");
            for (var s in e.validator.methods) {
                var o;
                s === "required" ? (o = r.get(0).getAttribute(s), o === "" && (o = !0), o = !!o) : o = r.attr(s), /min|max/.test(s) && (i === null || /number|range|text/.test(i)) && (o = Number(o)), o ? n[s] = o : i === s && i !== "range" && (n[s] = !0)
            }
            return n.maxlength && /-1|2147483647|524288/.test(n.maxlength) && delete n.maxlength, n
        },
        dataRules: function (t) {
            var n, r, i = {},
				s = e(t);
            for (n in e.validator.methods) r = s.data("rule-" + n.toLowerCase()), r !== undefined && (i[n] = r);
            return i
        },
        staticRules: function (t) {
            var n = {},
				r = e.data(t.form, "validator");
            return r.settings.rules && (n = e.validator.normalizeRule(r.settings.rules[t.name]) || {}), n
        },
        normalizeRules: function (t, n) {
            return e.each(t, function (r, i) {
                if (i === !1) {
                    delete t[r];
                    return
                }
                if (i.param || i.depends) {
                    var s = !0;
                    switch (typeof i.depends) {
                        case "string":
                            s = !!e(i.depends, n.form).length;
                            break;
                        case "function":
                            s = i.depends.call(n, n)
                    }
                    s ? t[r] = i.param !== undefined ? i.param : !0 : delete t[r]
                }
            }), e.each(t, function (r, i) {
                t[r] = e.isFunction(i) ? i(n) : i
            }), e.each(["minlength", "maxlength"], function () {
                t[this] && (t[this] = Number(t[this]))
            }), e.each(["rangelength", "range"], function () {
                var n;
                t[this] && (e.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : typeof t[this] == "string" && (n = t[this].split(/[\s,]+/), t[this] = [Number(n[0]), Number(n[1])]))
            }), e.validator.autoCreateRanges && (t.min && t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), t.minlength && t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
        },
        normalizeRule: function (t) {
            if (typeof t == "string") {
                var n = {};
                e.each(t.split(/\s/), function () {
                    n[this] = !0
                }), t = n
            }
            return t
        },
        addMethod: function (t, n, r) {
            e.validator.methods[t] = n, e.validator.messages[t] = r !== undefined ? r : e.validator.messages[t], n.length < 3 && e.validator.addClassRules(t, e.validator.normalizeRule(t))
        },
        methods: {
            required: function (t, n, r) {
                if (!this.depend(r, n)) return "dependency-mismatch";
                if (n.nodeName.toLowerCase() === "select") {
                    var i = e(n).val();
                    return i && i.length > 0
                }
                return this.checkable(n) ? this.getLength(t, n) > 0 : e.trim(t).length > 0
            },
            email: function (e, t) {
                return this.optional(t) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e)
            },
            url: function (e, t) {
                return this.optional(t) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e)
            },
            date: function (e, t) {
                return this.optional(t) || !/Invalid|NaN/.test((new Date(e)).toString())
            },
            dateISO: function (e, t) {
                return this.optional(t) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(e)
            },
            number: function (e, t) {
                return this.optional(t) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
            },
            digits: function (e, t) {
                return this.optional(t) || /^\d+$/.test(e)
            },
            creditcard: function (e, t) {
                if (this.optional(t)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(e)) return !1;
                var n = 0,
					r = 0,
					i = !1;
                e = e.replace(/\D/g, "");
                for (var s = e.length - 1; s >= 0; s--) {
                    var o = e.charAt(s);
                    r = parseInt(o, 10), i && (r *= 2) > 9 && (r -= 9), n += r, i = !i
                }
                return n % 10 === 0
            },
            minlength: function (t, n, r) {
                var i = e.isArray(t) ? t.length : this.getLength(e.trim(t), n);
                return this.optional(n) || i >= r
            },
            maxlength: function (t, n, r) {
                var i = e.isArray(t) ? t.length : this.getLength(e.trim(t), n);
                return this.optional(n) || i <= r
            },
            rangelength: function (t, n, r) {
                var i = e.isArray(t) ? t.length : this.getLength(e.trim(t), n);
                return this.optional(n) || i >= r[0] && i <= r[1]
            },
            min: function (e, t, n) {
                return this.optional(t) || e >= n
            },
            max: function (e, t, n) {
                return this.optional(t) || e <= n
            },
            range: function (e, t, n) {
                return this.optional(t) || e >= n[0] && e <= n[1]
            },
            equalTo: function (t, n, r) {
                var i = e(r);
                return this.settings.onfocusout && i.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                    e(n).valid()
                }), t === i.val()
            },
            remote: function (t, n, r) {
                if (this.optional(n)) return "dependency-mismatch";
                var i = this.previousValue(n);
                this.settings.messages[n.name] || (this.settings.messages[n.name] = {}), i.originalMessage = this.settings.messages[n.name].remote, this.settings.messages[n.name].remote = i.message, r = typeof r == "string" && {
                    url: r
                } || r;
                if (i.old === t) return i.valid;
                i.old = t;
                var s = this;
                this.startRequest(n);
                var o = {};
                return o[n.name] = t, e.ajax(e.extend(!0, {
                    url: r,
                    mode: "abort",
                    port: "validate" + n.name,
                    dataType: "json",
                    data: o,
                    success: function (r) {
                        s.settings.messages[n.name].remote = i.originalMessage;
                        var o = r === !0 || r === "true";
                        if (o) {
                            var u = s.formSubmitted;
                            s.prepareElement(n), s.formSubmitted = u, s.successList.push(n), delete s.invalid[n.name], s.showErrors()
                        } else {
                            var a = {},
								f = r || s.defaultMessage(n, "remote");
                            a[n.name] = i.message = e.isFunction(f) ? f(t) : f, s.invalid[n.name] = !0, s.showErrors(a)
                        }
                        i.valid = o, s.stopRequest(n, o)
                    }
                }, r)), "pending"
            }
        }
    }), e.format = e.validator.format
})(jQuery),
function (e) {
    var t = {};
    if (e.ajaxPrefilter) e.ajaxPrefilter(function (e, n, r) {
        var i = e.port;
        e.mode === "abort" && (t[i] && t[i].abort(), t[i] = r)
    });
    else {
        var n = e.ajax;
        e.ajax = function (r) {
            var i = ("mode" in r ? r : e.ajaxSettings).mode,
				s = ("port" in r ? r : e.ajaxSettings).port;
            return i === "abort" ? (t[s] && t[s].abort(), t[s] = n.apply(this, arguments), t[s]) : n.apply(this, arguments)
        }
    }
}(jQuery),
function (e) {
    e.extend(e.fn, {
        validateDelegate: function (t, n, r) {
            return this.bind(n, function (n) {
                var i = e(n.target);
                if (i.is(t)) return r.apply(i, arguments)
            })
        }
    })
}(jQuery),
function (e) {
    typeof define == "function" && define.amd ? define(["jquery"], e) : typeof exports == "object" ? e(require("jquery")) : e(jQuery)
}(function (e) {
    function n(e) {
        return u.raw ? e : encodeURIComponent(e)
    }

    function r(e) {
        return u.raw ? e : decodeURIComponent(e)
    }

    function i(e) {
        return n(u.json ? JSON.stringify(e) : String(e))
    }

    function s(e) {
        e.indexOf('"') === 0 && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return e = decodeURIComponent(e.replace(t, " ")), u.json ? JSON.parse(e) : e
        } catch (n) { }
    }

    function o(t, n) {
        var r = u.raw ? t : s(t);
        return e.isFunction(n) ? n(r) : r
    }
    var t = /\+/g,
		u = e.cookie = function (t, s, a) {
		    if (s !== undefined && !e.isFunction(s)) {
		        a = e.extend({}, u.defaults, a);
		        if (typeof a.expires == "number") {
		            var f = a.expires,
						l = a.expires = new Date;
		            l.setTime(+l + f * 864e5)
		        }
		        return document.cookie = [n(t), "=", i(s), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
		    }
		    var c = t ? undefined : {},
				h = document.cookie ? document.cookie.split("; ") : [];
		    for (var p = 0, d = h.length; p < d; p++) {
		        var v = h[p].split("="),
					m = r(v.shift()),
					g = v.join("=");
		        if (t && t === m) {
		            c = o(g, s);
		            break
		        } !t && (g = o(g)) !== undefined && (c[m] = g)
		    }
		    return c
		};
    u.defaults = {}, e.removeCookie = function (t, n) {
        return e.cookie(t) === undefined ? !1 : (e.cookie(t, "", e.extend({}, n, {
            expires: -1
        })), !e.cookie(t))
    }
}), ! function (e, t) {
    "use strict";
    var n = {
        "font-styles": "<li class='dropdown'><a class='btn dropdown-toggle' data-toggle='dropdown' href='#'><i class='icon-font'></i>&nbsp;<span class='current-font'>普通文本</span>&nbsp;<b class='caret'></b></a><ul class='dropdown-menu'><li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='div'>普通文本</a></li><li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h2'>标题 2</a></li><li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h3'>标题 3</a></li></ul>" + '<a class="btn" data-wysihtml5-command="formatBlock" title="代码" data-wysihtml5-command-value="pre">代码</a>' + '<a class="btn" data-wysihtml5-command="formatBlock" title="引用" data-wysihtml5-command-value="blockquote">引用</a>' + "</li>",
        emphasis: "<li><div class='btn-group'><a class='btn' data-wysihtml5-command='bold' title='CTRL+B'>加粗</a><a class='btn' data-wysihtml5-command='italic' title='CTRL+I'>斜体</a><a class='btn' data-wysihtml5-command='underline' title='CTRL+U'>下划线</a></div></li>",
        lists: "<li><div class='btn-group'><a class='btn' data-wysihtml5-command='insertUnorderedList' title='无序列表'><i class='icon-list'></i></a><a class='btn' data-wysihtml5-command='insertOrderedList' title='有序列表'><i class='icon-th-list'></i></a><a class='btn' data-wysihtml5-command='Outdent' title='缩进'><i class='icon-indent-right'></i></a><a class='btn' data-wysihtml5-command='Indent' title='缩出'><i class='icon-indent-left'></i></a></div></li>",
        link: "<li><div class='bootstrap-wysihtml5-insert-link-modal modal hide fade'><div class='modal-header'><a class='close' data-dismiss='modal'>&times;</a><h3>插入链接</h3></div><div class='modal-body'><input placeholder='http://' class='bootstrap-wysihtml5-insert-link-url input-xlarge' type='url'></div><div class='modal-footer'><a href='#' class='btn' data-dismiss='modal'>取消</a><a href='#' class='btn btn-primary' data-dismiss='modal'>插入链接</a></div></div><a class='btn' data-wysihtml5-command='createLink' title='链接'><i class='icon-share'></i></a></li>",
        image: "<li><div class='bootstrap-wysihtml5-insert-image-modal modal hide fade'><div class='modal-header'><a class='close' data-dismiss='modal'>&times;</a><h3>插入图片</h3></div><div class='modal-body'><input placeholder='http://' class='bootstrap-wysihtml5-insert-image-url input-xlarge' type='url'></div><div class='modal-footer'><a href='#' class='btn' data-dismiss='modal'>取消</a><a href='#' class='btn btn-primary' data-dismiss='modal'>插入图片</a></div></div><a class='btn' data-wysihtml5-command='insertImage' title='图片'><i class='icon-picture'></i></a></li>",
        html: "<li><div class='btn-group'><a class='btn' data-wysihtml5-action='change_view' title='编辑HTML'><i class='icon-pencil'></i> HTML</a></div></li>"
    },
		r = {
		    "font-styles": !0,
		    emphasis: !0,
		    lists: !0,
		    html: !1,
		    link: !0,
		    image: !0,
		    events: {},
		    parserRules: {
		        classes: {
		            table: 1,
		            list: 1
		        },
		        tags: {
		            tr: {
		                add_class: {
		                    align: "align_text"
		                }
		            },
		            strike: {
		                remove: 1
		            },
		            form: {
		                rename_tag: "div"
		            },
		            rt: {
		                rename_tag: "span"
		            },
		            code: {},
		            acronym: {
		                rename_tag: "span"
		            },
		            br: {
		                add_class: {
		                    clear: "clear_br"
		                }
		            },
		            details: {
		                rename_tag: "div"
		            },
		            h4: {
		                add_class: {
		                    align: "align_text"
		                }
		            },
		            em: {},
		            title: {
		                remove: 1
		            },
		            multicol: {
		                rename_tag: "div"
		            },
		            figure: {
		                rename_tag: "div"
		            },
		            xmp: {
		                rename_tag: "span"
		            },
		            small: {
		                rename_tag: "span",
		                set_class: "wysiwyg-font-size-smaller"
		            },
		            area: {
		                remove: 1
		            },
		            time: {
		                rename_tag: "span"
		            },
		            dir: {
		                rename_tag: "ul"
		            },
		            bdi: {
		                rename_tag: "span"
		            },
		            command: {
		                remove: 1
		            },
		            ul: {},
		            progress: {
		                rename_tag: "span"
		            },
		            dfn: {
		                rename_tag: "span"
		            },
		            iframe: {
		                remove: 1
		            },
		            figcaption: {
		                rename_tag: "div"
		            },
		            a: {
		                check_attributes: {
		                    href: "url"
		                },
		                set_attributes: {
		                    rel: "nofollow",
		                    target: "_blank"
		                }
		            },
		            img: {
		                check_attributes: {
		                    width: "numbers",
		                    alt: "alt",
		                    src: "url",
		                    height: "numbers"
		                },
		                add_class: {
		                    align: "align_img"
		                }
		            },
		            rb: {
		                rename_tag: "span"
		            },
		            footer: {
		                rename_tag: "div"
		            },
		            noframes: {
		                remove: 1
		            },
		            abbr: {
		                rename_tag: "span"
		            },
		            u: {},
		            bgsound: {
		                remove: 1
		            },
		            sup: {
		                rename_tag: "span"
		            },
		            address: {
		                rename_tag: "div"
		            },
		            basefont: {
		                remove: 1
		            },
		            nav: {
		                rename_tag: "div"
		            },
		            h1: {
		                add_class: {
		                    align: "align_text"
		                }
		            },
		            head: {
		                remove: 1
		            },
		            tbody: {
		                add_class: {
		                    align: "align_text"
		                }
		            },
		            dd: {
		                rename_tag: "div"
		            },
		            s: {
		                rename_tag: "span"
		            },
		            li: {},
		            td: {
		                check_attributes: {
		                    rowspan: "numbers",
		                    colspan: "numbers"
		                },
		                add_class: {
		                    align: "align_text"
		                }
		            },
		            object: {
		                remove: 1
		            },
		            div: {
		                add_class: {
		                    align: "align_text"
		                }
		            },
		            option: {
		                rename_tag: "span"
		            },
		            select: {
		                rename_tag: "span"
		            },
		            i: {},
		            track: {
		                remove: 1
		            },
		            wbr: {
		                remove: 1
		            },
		            fieldset: {
		                rename_tag: "div"
		            },
		            big: {
		                rename_tag: "span",
		                set_class: "wysiwyg-font-size-larger"
		            },
		            button: {
		                rename_tag: "span"
		            },
		            noscript: {
		                remove: 1
		            },
		            svg: {
		                remove: 1
		            },
		            input: {
		                remove: 1
		            },
		            table: {},
		            keygen: {
		                remove: 1
		            },
		            h5: {
		                add_class: {
		                    align: "align_text"
		                }
		            },
		            meta: {
		                remove: 1
		            },
		            map: {
		                rename_tag: "div"
		            },
		            isindex: {
		                remove: 1
		            },
		            mark: {
		                rename_tag: "span"
		            },
		            caption: {
		                add_class: {
		                    align: "align_text"
		                }
		            },
		            tfoot: {
		                add_class: {
		                    align: "align_text"
		                }
		            },
		            base: {
		                remove: 1
		            },
		            video: {
		                remove: 1
		            },
		            strong: {},
		            canvas: {
		                remove: 1
		            },
		            output: {
		                rename_tag: "span"
		            },
		            marquee: {
		                rename_tag: "span"
		            },
		            b: {},
		            q: {
		                check_attributes: {
		                    cite: "url"
		                }
		            },
		            applet: {
		                remove: 1
		            },
		            span: {},
		            rp: {
		                rename_tag: "span"
		            },
		            spacer: {
		                remove: 1
		            },
		            source: {
		                remove: 1
		            },
		            aside: {
		                rename_tag: "div"
		            },
		            frame: {
		                remove: 1
		            },
		            section: {
		                rename_tag: "div"
		            },
		            body: {
		                rename_tag: "div"
		            },
		            ol: {},
		            nobr: {
		                rename_tag: "span"
		            },
		            html: {
		                rename_tag: "div"
		            },
		            summary: {
		                rename_tag: "span"
		            },
		            "var": {
		                rename_tag: "span"
		            },
		            del: {
		                remove: 1
		            },
		            blockquote: {
		                check_attributes: {
		                    cite: "url"
		                }
		            },
		            style: {
		                remove: 1
		            },
		            device: {
		                remove: 1
		            },
		            meter: {
		                rename_tag: "span"
		            },
		            h3: {
		                add_class: {
		                    align: "align_text"
		                }
		            },
		            textarea: {
		                rename_tag: "span"
		            },
		            embed: {
		                remove: 1
		            },
		            hgroup: {
		                rename_tag: "div"
		            },
		            font: {
		                rename_tag: "span",
		                add_class: {
		                    size: "size_font"
		                }
		            },
		            tt: {
		                rename_tag: "span"
		            },
		            noembed: {
		                remove: 1
		            },
		            thead: {
		                add_class: {
		                    align: "align_text"
		                }
		            },
		            blink: {
		                rename_tag: "span"
		            },
		            plaintext: {
		                rename_tag: "span"
		            },
		            xml: {
		                remove: 1
		            },
		            h6: {
		                add_class: {
		                    align: "align_text"
		                }
		            },
		            param: {
		                remove: 1
		            },
		            th: {
		                check_attributes: {
		                    rowspan: "numbers",
		                    colspan: "numbers"
		                },
		                add_class: {
		                    align: "align_text"
		                }
		            },
		            legend: {
		                rename_tag: "span"
		            },
		            hr: {},
		            label: {
		                rename_tag: "span"
		            },
		            dl: {
		                rename_tag: "div"
		            },
		            kbd: {
		                rename_tag: "span"
		            },
		            listing: {
		                rename_tag: "div"
		            },
		            dt: {
		                rename_tag: "span"
		            },
		            nextid: {
		                remove: 1
		            },
		            pre: {},
		            center: {
		                rename_tag: "div",
		                set_class: "wysiwyg-text-align-center"
		            },
		            audio: {
		                remove: 1
		            },
		            datalist: {
		                rename_tag: "span"
		            },
		            samp: {
		                rename_tag: "span"
		            },
		            col: {
		                remove: 1
		            },
		            article: {
		                rename_tag: "div"
		            },
		            cite: {},
		            link: {
		                remove: 1
		            },
		            script: {
		                remove: 1
		            },
		            bdo: {
		                rename_tag: "span"
		            },
		            menu: {
		                rename_tag: "ul"
		            },
		            colgroup: {
		                remove: 1
		            },
		            ruby: {
		                rename_tag: "span"
		            },
		            h2: {
		                add_class: {
		                    align: "align_text"
		                }
		            },
		            ins: {
		                rename_tag: "span"
		            },
		            p: {
		                add_class: {
		                    align: "align_text"
		                }
		            },
		            sub: {
		                rename_tag: "span"
		            },
		            comment: {
		                remove: 1
		            },
		            frameset: {
		                remove: 1
		            },
		            optgroup: {
		                rename_tag: "span"
		            },
		            header: {
		                rename_tag: "div"
		            }
		        }
		    },
		    stylesheets: []
		},
		i = function (t, n) {
		    this.el = t, this.toolbar = this.createToolbar(t, n || r), this.editor = this.createEditor(n), window.editor = this.editor, e("iframe.wysihtml5-sandbox").each(function (t, n) {
		        e(n.contentWindow).off("focus.wysihtml5").on({
		            "focus.wysihtml5": function () {
		                e("li.dropdown").removeClass("open")
		            }
		        })
		    })
		};
    i.prototype = {
        constructor: i,
        createEditor: function (n) {
            n = e.extend(r, n || {}), n.toolbar = this.toolbar[0];
            var i = new t.Editor(this.el[0], n);
            if (n && n.events)
                for (var s in n.events) i.on(s, n.events[s]);
            return i
        },
        createToolbar: function (t, i) {
            var s = this,
				o = e("<ul/>", {
				    "class": "wysihtml5-toolbar",
				    style: "display:none"
				});
            for (var u in r) {
                var a = !1;
                i[u] !== undefined ? i[u] === !0 && (a = !0) : a = r[u], a === !0 && (o.append(n[u]), u == "html" && this.initHtml(o), u == "link" && this.initInsertLink(o), u == "image" && this.initInsertImage(o))
            }
            return o.find("a[data-wysihtml5-command='formatBlock']").click(function (t) {
                var n = e(t.srcElement);
                s.toolbar.find(".current-font").text(n.html())
            }), this.el.before(o), o
        },
        initHtml: function (e) {
            var t = "a[data-wysihtml5-action='change_view']";
            e.find(t).click(function (n) {
                e.find("a.btn").not(t).toggleClass("disabled")
            })
        },
        initInsertImage: function (e) {
            var t = this,
				n = e.find(".bootstrap-wysihtml5-insert-image-modal"),
				r = n.find(".bootstrap-wysihtml5-insert-image-url"),
				i = n.find("a.btn-primary"),
				s = r.val(),
				o = function () {
				    var e = r.val();
				    r.val(s), t.editor.composer.commands.exec("insertImage", e)
				};
            r.keypress(function (e) {
                e.which == 13 && (o(), n.modal("hide"))
            }), i.click(o), n.on("shown", function () {
                r.focus()
            }), n.on("hide", function () {
                t.editor.currentView.element.focus()
            }), e.find("a[data-wysihtml5-command=insertImage]").click(function () {
                return n.modal("show"), n.on("click.dismiss.modal", '[data-dismiss="modal"]', function (e) {
                    e.stopPropagation()
                }), !1
            })
        },
        initInsertLink: function (e) {
            var t = this,
				n = e.find(".bootstrap-wysihtml5-insert-link-modal"),
				r = n.find(".bootstrap-wysihtml5-insert-link-url"),
				i = n.find("a.btn-primary"),
				s = r.val(),
				o = function () {
				    var e = r.val();
				    r.val(s), t.editor.composer.commands.exec("createLink", {
				        href: e,
				        target: "_blank",
				        rel: "nofollow"
				    })
				},
				u = !1;
            r.keypress(function (e) {
                e.which == 13 && (o(), n.modal("hide"))
            }), i.click(o), n.on("shown", function () {
                r.focus()
            }), n.on("hide", function () {
                t.editor.currentView.element.focus()
            }), e.find("a[data-wysihtml5-command=createLink]").click(function () {
                return n.modal("show"), n.on("click.dismiss.modal", '[data-dismiss="modal"]', function (e) {
                    e.stopPropagation()
                }), !1
            })
        }
    }, e.fn.wysihtml5 = function (t) {
        return this.each(function () {
            var n = e(this);
            n.data("wysihtml5", new i(n, t))
        })
    }, e.fn.wysihtml5.Constructor = i
}(window.jQuery, window.wysihtml5), "use strict";
var Markdown;
typeof exports == "object" && typeof require == "function" ? Markdown = exports : Markdown = {},
	function () {
	    function e(e) {
	        return e
	    }

	    function t(e) {
	        return !1
	    }

	    function n() { }

	    function r() { }
	    n.prototype = {
	        chain: function (t, n) {
	            var r = this[t];
	            if (!r) throw new Error("unknown hook " + t);
	            r === e ? this[t] = n : this[t] = function (e) {
	                var t = Array.prototype.slice.call(arguments, 0);
	                return t[0] = r.apply(null, t), n.apply(null, t)
	            }
	        },
	        set: function (e, t) {
	            if (!this[e]) throw new Error("unknown hook " + e);
	            this[e] = t
	        },
	        addNoop: function (t) {
	            this[t] = e
	        },
	        addFalse: function (e) {
	            this[e] = t
	        }
	    }, Markdown.HookCollection = n, r.prototype = {
	        set: function (e, t) {
	            this["s_" + e] = t
	        },
	        get: function (e) {
	            return this["s_" + e]
	        }
	    }, Markdown.Converter = function () {
	        function u(e) {
	            return e = e.replace(/^[ ]{0,3}\[([^\[\]]+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function (e, n, r, s, o, u) {
	                return n = n.toLowerCase(), t.set(n, O(r)), o ? s : (u && i.set(n, u.replace(/"/g, "&quot;")), "")
	            }), e
	        }

	        function a(e) {
	            var t = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del",
					n = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math";
	            return e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, l), e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm, l), e = e.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, l), e = e.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g, l), e = e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, l), e
	        }

	        function f(e) {
	            return e = e.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (s.push(e) - 1) + "K\n\n"
	        }

	        function l(e, t) {
	            return f(t)
	        }

	        function h(t, n) {
	            t = e.preBlockGamut(t, c), t = w(t);
	            var r = "<hr />\n";
	            return t = t.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, r), t = t.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm, r), t = t.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, r), t = E(t), t = T(t), t = L(t), t = e.postBlockGamut(t, c), t = a(t), t = A(t, n), t
	        }

	        function p(t) {
	            return t = e.preSpanGamut(t), t = N(t), t = d(t), t = M(t), t = g(t), t = v(t), t = j(t), t = t.replace(/~P/g, "://"), t = O(t), t = k(t), t = t.replace(/  +\n/g, " <br>\n"), t = e.postSpanGamut(t), t
	        }

	        function d(e) {
	            var t = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;
	            return e = e.replace(t, function (e) {
	                var t = e.replace(/(.)<\/?code>(?=.)/g, "$1`");
	                return t = z(t, e.charAt(1) == "!" ? "\\`*_/" : "\\`*_"), t
	            }), e
	        }

	        function v(e) {
	            return e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, m), e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, m), e = e.replace(/(\[([^\[\]]+)\])()()()()()/g, m), e
	        }

	        function m(e, n, r, s, o, u, a, f) {
	            f == undefined && (f = "");
	            var l = n,
					c = r.replace(/:\/\//g, "~P"),
					h = s.toLowerCase(),
					p = o,
					d = f;
	            if (p == "") {
	                h == "" && (h = c.toLowerCase().replace(/ ?\n/g, " ")), p = "#" + h;
	                if (t.get(h) != undefined) p = t.get(h), i.get(h) != undefined && (d = i.get(h));
	                else {
	                    if (!(l.search(/\(\s*\)$/m) > -1)) return l;
	                    p = ""
	                }
	            }
	            p = U(p), p = z(p, "*_");
	            var v = '<a href="' + p + '"';
	            return d != "" && (d = y(d), d = z(d, "*_"), v += ' title="' + d + '"'), v += ">" + c + "</a>", v
	        }

	        function g(e) {
	            return e = e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, b), e = e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, b), e
	        }

	        function y(e) {
	            return e.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
	        }

	        function b(e, n, r, s, o, u, a, f) {
	            var l = n,
					c = r,
					h = s.toLowerCase(),
					p = o,
					d = f;
	            d || (d = "");
	            if (p == "") {
	                h == "" && (h = c.toLowerCase().replace(/ ?\n/g, " ")), p = "#" + h;
	                if (t.get(h) == undefined) return l;
	                p = t.get(h), i.get(h) != undefined && (d = i.get(h))
	            }
	            c = z(y(c), "*_[]()"), p = z(p, "*_");
	            var v = '<img src="' + p + '" alt="' + c + '"';
	            return d = y(d), d = z(d, "*_"), v += ' title="' + d + '"', v += " />", v
	        }

	        function w(e) {
	            return e = e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function (e, t) {
	                return "<h1>" + p(t) + "</h1>\n\n"
	            }), e = e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function (e, t) {
	                return "<h2>" + p(t) + "</h2>\n\n"
	            }), e = e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function (e, t, n) {
	                var r = t.length;
	                return "<h" + r + ">" + p(n) + "</h" + r + ">\n\n"
	            }), e
	        }

	        function E(e, t) {
	            e += "~0";
	            var n = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
	            return o ? e = e.replace(n, function (e, n, r) {
	                var i = n,
						s = r.search(/[*+-]/g) > -1 ? "ul" : "ol",
						o = x(i, s, t);
	                return o = o.replace(/\s+$/, ""), o = "<" + s + ">" + o + "</" + s + ">\n", o
	            }) : (n = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g, e = e.replace(n, function (e, t, n, r) {
	                var i = t,
						s = n,
						o = r.search(/[*+-]/g) > -1 ? "ul" : "ol",
						u = x(s, o);
	                return u = i + "<" + o + ">\n" + u + "</" + o + ">\n", u
	            })), e = e.replace(/~0/, ""), e
	        }

	        function x(e, t, n) {
	            o++, e = e.replace(/\n{2,}$/, "\n"), e += "~0";
	            var r = S[t],
					i = new RegExp("(^[ \\t]*)(" + r + ")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1(" + r + ")[ \\t]+))", "gm"),
					s = !1;
	            return e = e.replace(i, function (e, t, r, i) {
	                var o = i,
						u = t,
						a = /\n\n$/.test(o),
						f = a || o.search(/\n{2,}/) > -1;
	                return f || s ? o = h(I(o), !0) : (o = E(I(o), !0), o = o.replace(/\n$/, ""), n || (o = p(o))), s = a, "<li>" + o + "</li>\n"
	            }), e = e.replace(/~0/g, ""), o--, e
	        }

	        function T(e) {
	            return e += "~0", e = e.replace(/(?:\n\n|^\n?)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function (e, t, n) {
	                var r = t,
						i = n;
	                return r = C(I(r)), r = q(r), r = r.replace(/^\n+/g, ""), r = r.replace(/\n+$/g, ""), r = "<pre><code>" + r + "\n</code></pre>", "\n\n" + r + "\n\n" + i
	            }), e = e.replace(/~0/, ""), e
	        }

	        function N(e) {
	            return e = e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function (e, t, n, r, i) {
	                var s = r;
	                return s = s.replace(/^([ \t]*)/g, ""), s = s.replace(/[ \t]*$/g, ""), s = C(s), s = s.replace(/:\/\//g, "~P"), t + "<code>" + s + "</code>"
	            }), e
	        }

	        function C(e) {
	            return e = e.replace(/&/g, "&amp;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), e = z(e, "*_{}[]\\", !1), e
	        }

	        function k(e) {
	            return e = e.replace(/(^|[\W_])(?:(?!\1)|(?=^))(\*|_)\2(?=\S)([^\r]*?\S)\2\2(?!\2)(?=[\W_]|$)/g, "$1<strong>$3</strong>"), e = e.replace(/(^|[\W_])(?:(?!\1)|(?=^))(\*|_)(?=\S)((?:(?!\2)[^\r])*?\S)\2(?!\2)(?=[\W_]|$)/g, "$1<em>$3</em>"), e
	        }

	        function L(e) {
	            return e = e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function (e, t) {
	                var n = t;
	                return n = n.replace(/^[ \t]*>[ \t]?/gm, "~0"), n = n.replace(/~0/g, ""), n = n.replace(/^[ \t]+$/gm, ""), n = h(n), n = n.replace(/(^|\n)/g, "$1  "), n = n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (e, t) {
	                    var n = t;
	                    return n = n.replace(/^  /mg, "~0"), n = n.replace(/~0/g, ""), n
	                }), f("<blockquote>\n" + n + "\n</blockquote>")
	            }), e
	        }

	        function A(e, t) {
	            e = e.replace(/^\n+/g, ""), e = e.replace(/\n+$/g, "");
	            var n = e.split(/\n{2,}/g),
					r = [],
					i = /~K(\d+)K/,
					o = n.length;
	            for (var u = 0; u < o; u++) {
	                var a = n[u];
	                i.test(a) ? r.push(a) : /\S/.test(a) && (a = p(a), a = a.replace(/^([ \t]*)/g, "<p>"), a += "</p>", r.push(a))
	            }
	            if (!t) {
	                o = r.length;
	                for (var u = 0; u < o; u++) {
	                    var f = !0;
	                    while (f) f = !1, r[u] = r[u].replace(/~K(\d+)K/g, function (e, t) {
	                        return f = !0, s[t]
	                    })
	                }
	            }
	            return r.join("\n\n")
	        }

	        function O(e) {
	            return e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), e = e.replace(/<(?![a-z\/?!]|~D)/gi, "&lt;"), e
	        }

	        function M(e) {
	            return e = e.replace(/\\(\\)/g, W), e = e.replace(/\\([`*_{}\[\]()>#+-.!])/g, W), e
	        }

	        function B(e, t, n, r) {
	            if (t) return e;
	            if (r.charAt(r.length - 1) !== ")") return "<" + n + r + ">";
	            var i = r.match(/[()]/g),
					s = 0;
	            for (var o = 0; o < i.length; o++) i[o] === "(" ? s <= 0 ? s = 1 : s++ : s--;
	            var u = "";
	            if (s < 0) {
	                var a = new RegExp("\\){1," + -s + "}$");
	                r = r.replace(a, function (e) {
	                    return u = e, ""
	                })
	            }
	            if (u) {
	                var f = r.charAt(r.length - 1);
	                H.test(f) || (u = f + u, r = r.substr(0, r.length - 1))
	            }
	            return "<" + n + r + ">" + u
	        }

	        function j(t) {
	            t = t.replace(P, B);
	            var n = function (t, n) {
	                return '<a href="' + U(n) + '">' + e.plainLinkText(n) + "</a>"
	            };
	            return t = t.replace(/<((https?|ftp):[^'">\s]+)>/gi, n), t
	        }

	        function F(e) {
	            return e = e.replace(/~E(\d+)E/g, function (e, t) {
	                var n = parseInt(t);
	                return String.fromCharCode(n)
	            }), e
	        }

	        function I(e) {
	            return e = e.replace(/^(\t|[ ]{1,4})/gm, "~0"), e = e.replace(/~0/g, ""), e
	        }

	        function q(e) {
	            if (!/\t/.test(e)) return e;
	            var t = ["    ", "   ", "  ", " "],
					n = 0,
					r;
	            return e.replace(/[\n\t]/g, function (e, i) {
	                return e === "\n" ? (n = i + 1, e) : (r = (i - n) % 4, n = i + 1, t[r])
	            })
	        }

	        function U(e) {
	            if (!e) return "";
	            var t = e.length;
	            return e.replace(R, function (n, r) {
	                if (n == "~D") return "%24";
	                if (n == ":")
	                    if (r == t - 1 || /[0-9\/]/.test(e.charAt(r + 1))) return ":";
	                return "%" + n.charCodeAt(0).toString(16)
	            })
	        }

	        function z(e, t, n) {
	            var r = "([" + t.replace(/([\[\]\\])/g, "\\$1") + "])";
	            n && (r = "\\\\" + r);
	            var i = new RegExp(r, "g");
	            return e = e.replace(i, W), e
	        }

	        function W(e, t) {
	            var n = t.charCodeAt(0);
	            return "~E" + n + "E"
	        }
	        var e = this.hooks = new n;
	        e.addNoop("plainLinkText"), e.addNoop("preConversion"), e.addNoop("postNormalization"), e.addNoop("preBlockGamut"), e.addNoop("postBlockGamut"), e.addNoop("preSpanGamut"), e.addNoop("postSpanGamut"), e.addNoop("postConversion");
	        var t, i, s, o;
	        this.makeHtml = function (n) {
	            if (t) throw new Error("Recursive call to converter.makeHtml");
	            return t = new r, i = new r, s = [], o = 0, n = e.preConversion(n), n = n.replace(/~/g, "~T"), n = n.replace(/\$/g, "~D"), n = n.replace(/\r\n/g, "\n"), n = n.replace(/\r/g, "\n"), n = "\n\n" + n + "\n\n", n = q(n), n = n.replace(/^[ \t]+$/mg, ""), n = e.postNormalization(n), n = a(n), n = u(n), n = h(n), n = F(n), n = n.replace(/~D/g, "$$"), n = n.replace(/~T/g, "~"), n = e.postConversion(n), s = i = t = null, n
	        };
	        var c = function (e) {
	            return h(e)
	        },
				S = {
				    ol: "\\d+[.]",
				    ul: "[*+-]"
				},
				_ = "[-A-Z0-9+&@#/%?=~_|[\\]()!:,.;]",
				D = "[-A-Z0-9+&@#/%=~_|[\\])]",
				P = new RegExp('(="|<)?\\b(https?|ftp)(://' + _ + "*" + D + ")(?=$|\\W)", "gi"),
				H = new RegExp(D, "i"),
				R = /(?:["'*()[\]:_]|~D)/g
	    }
	}(),
	function () {
	    function n(e) {
	        return e.replace(/<[^>]*>?/gi, o)
	    }

	    function o(e) {
	        return e.match(r) || e.match(i) || e.match(s) ? e : ""
	    }

	    function u(e) {
	        if (e == "") return "";
	        var t = /<\/?\w+[^>]*(\s|$|>)/g,
				n = e.toLowerCase().match(t),
				r = (n || []).length;
	        if (r == 0) return e;
	        var i, s, o = "<p><img><br><li><hr>",
				u, a = [],
				f = [],
				l = !1;
	        for (var c = 0; c < r; c++) {
	            i = n[c].replace(/<\/?(\w+).*/, "$1");
	            if (a[c] || o.search("<" + i + ">") > -1) continue;
	            s = n[c], u = -1;
	            if (!/^<\//.test(s))
	                for (var h = c + 1; h < r; h++)
	                    if (!a[h] && n[h] == "</" + i + ">") {
	                        u = h;
	                        break
	                    }
	            u == -1 ? l = f[c] = !0 : a[u] = !0
	        }
	        if (!l) return e;
	        var c = 0;
	        return e = e.replace(t, function (e) {
	            var t = f[c] ? "" : e;
	            return c++, t
	        }), e
	    }
	    var e, t;
	    typeof exports == "object" && typeof require == "function" ? (e = exports, t = require("./Markdown.Converter").Converter) : (e = window.Markdown, t = e.Converter), e.getSanitizingConverter = function () {
	        var e = new t;
	        return e.hooks.chain("postConversion", n), e.hooks.chain("postConversion", u), e
	    };
	    var r = /^(<\/?(b|blockquote|code|del|dd|dl|dt|em|h1|h2|h3|i|kbd|li|ol|p|pre|s|sup|sub|strong|strike|ul)>|<(br|hr)\s?\/?>)$/i,
			i = /^(<a\shref="((https?|ftp):\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\stitle="[^"<>]+")?\s?>|<\/a>)$/i,
			s = /^(<img\ssrc="(https?:\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\swidth="\d{1,3}")?(\sheight="\d{1,3}")?(\salt="[^"<>]*")?(\stitle="[^"<>]*")?\s?\/?>)$/i
	}(),
	function () {
	    function c() { }

	    function h(e) {
	        this.buttonBar = r.getElementById("wmd-button-bar" + e), this.preview = r.getElementById("wmd-preview" + e), this.input = r.getElementById("wmd-input" + e)
	    }

	    function p(t, n) {
	        var r = this,
				i = [],
				s = 0,
				o = "none",
				a, f, l, c = function (e, t) {
				    o != e && (o = e, t || p()), !u.isIE || o != "moving" ? f = setTimeout(h, 1) : l = null
				},
				h = function (e) {
				    l = new d(n, e), f = undefined
				};
	        this.setCommandMode = function () {
	            o = "command", p(), f = setTimeout(h, 0)
	        }, this.canUndo = function () {
	            return s > 1
	        }, this.canRedo = function () {
	            return i[s + 1] ? !0 : !1
	        }, this.undo = function () {
	            r.canUndo() && (a ? (a.restore(), a = null) : (i[s] = new d(n), i[--s].restore(), t && t())), o = "none", n.input.focus(), h()
	        }, this.redo = function () {
	            r.canRedo() && (i[++s].restore(), t && t()), o = "none", n.input.focus(), h()
	        };
	        var p = function () {
	            var e = l || new d(n);
	            if (!e) return !1;
	            if (o == "moving") {
	                a || (a = e);
	                return
	            }
	            a && (i[s - 1].text != a.text && (i[s++] = a), a = null), i[s++] = e, i[s + 1] = null, t && t()
	        },
				v = function (e) {
				    var t = !1;
				    if ((e.ctrlKey || e.metaKey) && !e.altKey) {
				        var n = e.charCode || e.keyCode,
							i = String.fromCharCode(n);
				        switch (i.toLowerCase()) {
				            case "y":
				                r.redo(), t = !0;
				                break;
				            case "z":
				                e.shiftKey ? r.redo() : r.undo(), t = !0
				        }
				    }
				    if (t) {
				        e.preventDefault && e.preventDefault(), window.event && (window.event.returnValue = !1);
				        return
				    }
				},
				m = function (e) {
				    if (!e.ctrlKey && !e.metaKey) {
				        var t = e.keyCode;
				        t >= 33 && t <= 40 || t >= 63232 && t <= 63235 ? c("moving") : t == 8 || t == 46 || t == 127 ? c("deleting") : t == 13 ? c("newlines") : t == 27 ? c("escape") : (t < 16 || t > 20) && t != 91 && c("typing")
				    }
				},
				g = function () {
				    e.addEvent(n.input, "keypress", function (e) {
				        (e.ctrlKey || e.metaKey) && !e.altKey && (e.keyCode == 89 || e.keyCode == 90) && e.preventDefault()
				    });
				    var t = function () {
				        (u.isIE || l && l.text != n.input.value) && f == undefined && (o = "paste", p(), h())
				    };
				    e.addEvent(n.input, "keydown", v), e.addEvent(n.input, "keydown", m), e.addEvent(n.input, "mousedown", function () {
				        c("moving")
				    }), n.input.onpaste = t, n.input.ondrop = t
				},
				y = function () {
				    g(), h(!0), p()
				};
	        y()
	    }

	    function d(t, n) {
	        var i = this,
				s = t.input;
	        this.init = function () {
	            if (!e.isVisible(s)) return;
	            if (!n && r.activeElement && r.activeElement !== s) return;
	            this.setInputAreaSelectionStartEnd(), this.scrollTop = s.scrollTop;
	            if (!this.text && s.selectionStart || s.selectionStart === 0) this.text = s.value
	        }, this.setInputAreaSelection = function () {
	            if (!e.isVisible(s)) return;
	            if (s.selectionStart !== undefined && !u.isOpera) s.focus(), s.selectionStart = i.start, s.selectionEnd = i.end, s.scrollTop = i.scrollTop;
	            else if (r.selection) {
	                if (r.activeElement && r.activeElement !== s) return;
	                s.focus();
	                var t = s.createTextRange();
	                t.moveStart("character", -s.value.length), t.moveEnd("character", -s.value.length), t.moveEnd("character", i.end), t.moveStart("character", i.start), t.select()
	            }
	        }, this.setInputAreaSelectionStartEnd = function () {
	            if (!t.ieCachedRange && (s.selectionStart || s.selectionStart === 0)) i.start = s.selectionStart, i.end = s.selectionEnd;
	            else if (r.selection) {
	                i.text = e.fixEolChars(s.value);
	                var n = t.ieCachedRange || r.selection.createRange(),
						o = e.fixEolChars(n.text),
						u = "",
						a = u + o + u;
	                n.text = a;
	                var f = e.fixEolChars(s.value);
	                n.moveStart("character", -a.length), n.text = o, i.start = f.indexOf(u), i.end = f.lastIndexOf(u) - u.length;
	                var l = i.text.length - e.fixEolChars(s.value).length;
	                if (l) {
	                    n.moveStart("character", -o.length);
	                    while (l--) o += "\n", i.end += 1;
	                    n.text = o
	                }
	                t.ieCachedRange && (i.scrollTop = t.ieCachedScrollTop), t.ieCachedRange = null, this.setInputAreaSelection()
	            }
	        }, this.restore = function () {
	            i.text != undefined && i.text != s.value && (s.value = i.text), this.setInputAreaSelection(), s.scrollTop = i.scrollTop
	        }, this.getChunks = function () {
	            var t = new c;
	            return t.before = e.fixEolChars(i.text.substring(0, i.start)), t.startTag = "", t.selection = e.fixEolChars(i.text.substring(i.start, i.end)), t.endTag = "", t.after = e.fixEolChars(i.text.substring(i.end)), t.scrollTop = i.scrollTop, t
	        }, this.setChunks = function (e) {
	            e.before = e.before + e.startTag, e.after = e.endTag + e.after, this.start = e.before.length, this.end = e.before.length + e.selection.length, this.text = e.before + e.selection + e.after, this.scrollTop = e.scrollTop
	        }, this.init()
	    }

	    function v(n, i, s) {
	        var o = this,
				a, f, l, c = 3e3,
				h = "delayed",
				p = function (t, n) {
				    e.addEvent(t, "input", n), t.onpaste = n, t.ondrop = n, e.addEvent(t, "keypress", n), e.addEvent(t, "keydown", n)
				},
				d = function () {
				    var e = 0;
				    return window.innerHeight ? e = window.pageYOffset : r.documentElement && r.documentElement.scrollTop ? e = r.documentElement.scrollTop : r.body && (e = r.body.scrollTop), e
				},
				v = function () {
				    if (!i.preview) return;
				    var e = i.input.value;
				    if (e && e == l) return;
				    l = e;
				    var t = (new Date).getTime();
				    e = n.makeHtml(e);
				    var r = (new Date).getTime();
				    f = r - t, T(e)
				},
				m = function () {
				    a && (clearTimeout(a), a = undefined);
				    if (h !== "manual") {
				        var e = 0;
				        h === "delayed" && (e = f), e > c && (e = c), a = setTimeout(v, e)
				    }
				},
				g = function (e) {
				    return e.scrollHeight <= e.clientHeight ? 1 : e.scrollTop / (e.scrollHeight - e.clientHeight)
				},
				y = function () {
				    i.preview && (i.preview.scrollTop = (i.preview.scrollHeight - i.preview.clientHeight) * g(i.preview))
				};
	        this.refresh = function (e) {
	            e ? (l = "", v()) : m()
	        }, this.processingTime = function () {
	            return f
	        };
	        var b = !0,
				w = function (e) {
				    var t = i.preview,
						n = t.parentNode,
						r = t.nextSibling;
				    n.removeChild(t), t.innerHTML = e, r ? n.insertBefore(t, r) : n.appendChild(t)
				},
				E = function (e) {
				    i.preview.innerHTML = e
				},
				S, x = function (e) {
				    if (S) return S(e);
				    try {
				        E(e), S = E
				    } catch (t) {
				        S = w, S(e)
				    }
				},
				T = function (e) {
				    var n = t.getTop(i.input) - d();
				    i.preview && (x(e), s()), y();
				    if (b) {
				        b = !1;
				        return
				    }
				    var r = t.getTop(i.input) - d();
				    u.isIE ? setTimeout(function () {
				        window.scrollBy(0, r - n)
				    }, 0) : window.scrollBy(0, r - n)
				},
				N = function () {
				    p(i.input, m), v(), i.preview && (i.preview.scrollTop = 0)
				};
	        N()
	    }

	    function m(t, n, i, o, a, f, l) {
	        function v(e) {
	            c.focus();
	            if (e.textOp) {
	                i && i.setCommandMode();
	                var t = new d(n);
	                if (!t) return;
	                var r = t.getChunks(),
						s = function () {
						    c.focus(), r && t.setChunks(r), t.restore(), o.refresh()
						},
						u = e.textOp(r, s);
	                u || s()
	            }
	            e.execute && e.execute(i)
	        }

	        function m(e, t) {
	            var i = "0px",
					s = "-20px",
					o = "-40px",
					a = e.getElementsByTagName("span")[0];
	            t ? (a.style.backgroundPosition = e.XShift + " " + i, e.onmouseover = function () {
	                a.style.backgroundPosition = this.XShift + " " + o
	            }, e.onmouseout = function () {
	                a.style.backgroundPosition = this.XShift + " " + i
	            }, u.isIE && (e.onmousedown = function () {
	                if (r.activeElement && r.activeElement !== n.input) return;
	                n.ieCachedRange = document.selection.createRange(), n.ieCachedScrollTop = n.input.scrollTop
	            }), e.isHelp || (e.onclick = function () {
	                return this.onmouseout && this.onmouseout(), v(this), !1
	            })) : (a.style.backgroundPosition = e.XShift + " " + s, e.onmouseover = e.onmouseout = e.onclick = function () { })
	        }

	        function g(e) {
	            return typeof e == "string" && (e = a[e]),
					function () {
					    e.apply(a, arguments)
					}
	        }

	        function y() {
	            var e = n.buttonBar,
					r = "0px",
					i = "-20px",
					o = "-40px",
					u = document.createElement("ul");
	            u.id = "wmd-button-row" + t, u.className = "wmd-button-row", u = e.appendChild(u);
	            var a = 0,
					c = function (e, n, r, i) {
					    var s = document.createElement("li");
					    s.className = "wmd-button", s.style.left = a + "px", a += 25;
					    var o = document.createElement("span");
					    return s.id = e + t, s.appendChild(o), s.title = n, s.XShift = r, i && (s.textOp = i), m(s, !0), u.appendChild(s), s
					},
					p = function (e) {
					    var n = document.createElement("li");
					    n.className = "wmd-spacer wmd-spacer" + e, n.id = "wmd-spacer" + e + t, u.appendChild(n), a += 25
					};
	            h.bold = c("wmd-bold-button", l("bold"), "0px", g("doBold")), h.italic = c("wmd-italic-button", l("italic"), "-20px", g("doItalic")), p(1), h.link = c("wmd-link-button", l("link"), "-40px", g(function (e, t) {
	                return this.doLinkOrImage(e, t, !1)
	            })), h.quote = c("wmd-quote-button", l("quote"), "-60px", g("doBlockquote")), h.code = c("wmd-code-button", l("code"), "-80px", g("doCode")), h.image = c("wmd-image-button", l("image"), "-100px", g(function (e, t) {
	                return this.doLinkOrImage(e, t, !0)
	            })), p(2), h.olist = c("wmd-olist-button", l("olist"), "-120px", g(function (e, t) {
	                this.doList(e, t, !0)
	            })), h.ulist = c("wmd-ulist-button", l("ulist"), "-140px", g(function (e, t) {
	                this.doList(e, t, !1)
	            })), h.heading = c("wmd-heading-button", l("heading"), "-160px", g("doHeading")), h.hr = c("wmd-hr-button", l("hr"), "-180px", g("doHorizontalRule")), p(3), h.undo = c("wmd-undo-button", l("undo"), "-200px", null), h.undo.execute = function (e) {
	                e && e.undo()
	            };
	            var d = /win/.test(s.platform.toLowerCase()) ? l("redo") : l("redomac");
	            h.redo = c("wmd-redo-button", d, "-220px", null), h.redo.execute = function (e) {
	                e && e.redo()
	            };
	            if (f) {
	                var v = document.createElement("li"),
						y = document.createElement("span");
	                v.appendChild(y), v.className = "wmd-button wmd-help-button", v.id = "wmd-help-button" + t, v.XShift = "-240px", v.isHelp = !0, v.style.right = "0px", v.title = l("help"), v.onclick = f.handler, m(v, !0), u.appendChild(v), h.help = v
	            }
	            b()
	        }

	        function b() {
	            i && (m(h.undo, i.canUndo()), m(h.redo, i.canRedo()))
	        }
	        var c = n.input,
				h = {};
	        y();
	        var p = "keydown";
	        u.isOpera && (p = "keypress"), e.addEvent(c, p, function (e) {
	            if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
	                var t = e.charCode || e.keyCode,
						n = String.fromCharCode(t).toLowerCase();
	                switch (n) {
	                    case "b":
	                        v(h.bold);
	                        break;
	                    case "i":
	                        v(h.italic);
	                        break;
	                    case "l":
	                        v(h.link);
	                        break;
	                    case "q":
	                        v(h.quote);
	                        break;
	                    case "k":
	                        v(h.code);
	                        break;
	                    case "g":
	                        v(h.image);
	                        break;
	                    case "o":
	                        v(h.olist);
	                        break;
	                    case "u":
	                        v(h.ulist);
	                        break;
	                    case "h":
	                        v(h.heading);
	                        break;
	                    case "r":
	                        v(h.hr);
	                        break;
	                    case "y":
	                        v(h.redo);
	                        break;
	                    case "z":
	                        e.shiftKey ? v(h.redo) : v(h.undo);
	                        break;
	                    default:
	                        return
	                }
	                e.preventDefault && e.preventDefault(), window.event && (window.event.returnValue = !1)
	            }
	        }), e.addEvent(c, "keyup", function (e) {
	            if (e.shiftKey && !e.ctrlKey && !e.metaKey) {
	                var t = e.charCode || e.keyCode;
	                if (t === 13) {
	                    var n = {};
	                    n.textOp = g("doAutoindent"), v(n)
	                }
	            }
	        }), u.isIE && e.addEvent(c, "keydown", function (e) {
	            var t = e.keyCode;
	            if (t === 27) return !1
	        }), this.setUndoRedoButtonStates = b
	    }

	    function g(e, t) {
	        this.hooks = e, this.getString = t
	    }

	    function b(e) {
	        return e.replace(/^\s*(.*?)(?:\s+"(.+)")?\s*$/, function (e, t, n) {
	            return t = t.replace(/\?.*$/, function (e) {
	                return e.replace(/\+/g, " ")
	            }), t = decodeURIComponent(t), t = encodeURI(t).replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29"), t = t.replace(/\?.*$/, function (e) {
	                return e.replace(/\+/g, "%2b")
	            }), n && (n = n.trim ? n.trim() : n.replace(/^\s*/, "").replace(/\s*$/, ""), n = n.replace(/"/g, "quot;").replace(/\(/g, "&#40;").replace(/\)/g, "&#41;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), n ? t + ' "' + n + '"' : t
	        })
	    }
	    var e = {},
			t = {},
			n = {},
			r = window.document,
			i = window.RegExp,
			s = window.navigator,
			o = {
			    lineLength: 72
			},
			u = {
			    isIE: /msie/.test(s.userAgent.toLowerCase()),
			    isIE_5or6: /msie 6/.test(s.userAgent.toLowerCase()) || /msie 5/.test(s.userAgent.toLowerCase()),
			    isOpera: /opera/.test(s.userAgent.toLowerCase())
			},
			a = {
			    bold: "Strong <strong> Ctrl+B",
			    boldexample: "strong text",
			    italic: "Emphasis <em> Ctrl+I",
			    italicexample: "emphasized text",
			    link: "Hyperlink <a> Ctrl+L",
			    linkdescription: "enter link description here",
			    linkdialog: '<p><b>Insert Hyperlink</b></p><p>http://example.com/ "optional title"</p>',
			    quote: "Blockquote <blockquote> Ctrl+Q",
			    quoteexample: "Blockquote",
			    code: "Code Sample <pre><code> Ctrl+K",
			    codeexample: "enter code here",
			    image: "Image <img> Ctrl+G",
			    imagedescription: "enter image description here",
			    imagedialog: "<p><b>Insert Image</b></p><p>http://example.com/images/diagram.jpg \"optional title\"<br><br>Need <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>free image hosting?</a></p>",
			    olist: "Numbered List <ol> Ctrl+O",
			    ulist: "Bulleted List <ul> Ctrl+U",
			    litem: "List item",
			    heading: "Heading <h1>/<h2> Ctrl+H",
			    headingexample: "Heading",
			    hr: "Horizontal Rule <hr> Ctrl+R",
			    undo: "Undo - Ctrl+Z",
			    redo: "Redo - Ctrl+Y",
			    redomac: "Redo - Ctrl+Shift+Z",
			    help: "Markdown Editing Help"
			},
			f = "http://",
			l = "http://";
	    Markdown.Editor = function (e, t, n) {
	        n = n || {}, typeof n.handler == "function" && (n = {
	            helpButton: n
	        }), n.strings = n.strings || {}, n.helpButton && (n.strings.help = n.strings.help || n.helpButton.title);
	        var i = function (e) {
	            return n.strings[e] || a[e]
	        };
	        t = t || "";
	        var s = this.hooks = new Markdown.HookCollection;
	        s.addNoop("onPreviewRefresh"), s.addNoop("postBlockquoteCreation"), s.addFalse("insertImageDialog"), this.getConverter = function () {
	            return e
	        };
	        var o = this,
				u;
	        this.run = function () {
	            if (u) return;
	            u = new h(t);
	            var a = new g(s, i),
					f = new v(e, u, function () {
					    s.onPreviewRefresh()
					}),
					l, c;
	            /\?noundo/.test(r.location.href) || (l = new p(function () {
	                f.refresh(), c && c.setUndoRedoButtonStates()
	            }, u), this.textOperation = function (e) {
	                l.setCommandMode(), e(), o.refreshPreview()
	            }), c = new m(t, u, l, f, a, n.helpButton, i), c.setUndoRedoButtonStates();
	            var d = o.refreshPreview = function () {
	                f.refresh(!0)
	            };
	            d()
	        }
	    }, c.prototype.findTags = function (t, n) {
	        var r = this,
				i;
	        t && (i = e.extendRegExp(t, "", "$"), this.before = this.before.replace(i, function (e) {
	            return r.startTag = r.startTag + e, ""
	        }), i = e.extendRegExp(t, "^", ""), this.selection = this.selection.replace(i, function (e) {
	            return r.startTag = r.startTag + e, ""
	        })), n && (i = e.extendRegExp(n, "", "$"), this.selection = this.selection.replace(i, function (e) {
	            return r.endTag = e + r.endTag, ""
	        }), i = e.extendRegExp(n, "^", ""), this.after = this.after.replace(i, function (e) {
	            return r.endTag = e + r.endTag, ""
	        }))
	    }, c.prototype.trimWhitespace = function (e) {
	        var t, n, r = this;
	        e ? t = n = "" : (t = function (e) {
	            return r.before += e, ""
	        }, n = function (e) {
	            return r.after = e + r.after, ""
	        }), this.selection = this.selection.replace(/^(\s*)/, t).replace(/(\s*)$/, n)
	    }, c.prototype.skipLines = function (e, t, n) {
	        e === undefined && (e = 1), t === undefined && (t = 1), e++, t++;
	        var r, s;
	        navigator.userAgent.match(/Chrome/) && "X".match(/()./), this.selection = this.selection.replace(/(^\n*)/, ""), this.startTag = this.startTag + i.$1, this.selection = this.selection.replace(/(\n*$)/, ""), this.endTag = this.endTag + i.$1, this.startTag = this.startTag.replace(/(^\n*)/, ""), this.before = this.before + i.$1, this.endTag = this.endTag.replace(/(\n*$)/, ""), this.after = this.after + i.$1;
	        if (this.before) {
	            r = s = "";
	            while (e--) r += "\\n?", s += "\n";
	            n && (r = "\\n*"), this.before = this.before.replace(new i(r + "$", ""), s)
	        }
	        if (this.after) {
	            r = s = "";
	            while (t--) r += "\\n?", s += "\n";
	            n && (r = "\\n*"), this.after = this.after.replace(new i(r, ""), s)
	        }
	    }, e.isVisible = function (e) {
	        if (window.getComputedStyle) return window.getComputedStyle(e, null).getPropertyValue("display") !== "none";
	        if (e.currentStyle) return e.currentStyle.display !== "none"
	    }, e.addEvent = function (e, t, n) {
	        e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener(t, n, !1)
	    }, e.removeEvent = function (e, t, n) {
	        e.detachEvent ? e.detachEvent("on" + t, n) : e.removeEventListener(t, n, !1)
	    }, e.fixEolChars = function (e) {
	        return e = e.replace(/\r\n/g, "\n"), e = e.replace(/\r/g, "\n"), e
	    }, e.extendRegExp = function (e, t, n) {
	        if (t === null || t === undefined) t = "";
	        if (n === null || n === undefined) n = "";
	        var r = e.toString(),
				s;
	        return r = r.replace(/\/([gim]*)$/, function (e, t) {
	            return s = t, ""
	        }), r = r.replace(/(^\/|\/$)/g, ""), r = t + r + n, new i(r, s)
	    }, t.getTop = function (e, t) {
	        var n = e.offsetTop;
	        if (!t)
	            while (e = e.offsetParent) n += e.offsetTop;
	        return n
	    }, t.getHeight = function (e) {
	        return e.offsetHeight || e.scrollHeight
	    }, t.getWidth = function (e) {
	        return e.offsetWidth || e.scrollWidth
	    }, t.getPageSize = function () {
	        var e, t, n, i;
	        self.innerHeight && self.scrollMaxY ? (e = r.body.scrollWidth, t = self.innerHeight + self.scrollMaxY) : r.body.scrollHeight > r.body.offsetHeight ? (e = r.body.scrollWidth, t = r.body.scrollHeight) : (e = r.body.offsetWidth, t = r.body.offsetHeight), self.innerHeight ? (n = self.innerWidth, i = self.innerHeight) : r.documentElement && r.documentElement.clientHeight ? (n = r.documentElement.clientWidth, i = r.documentElement.clientHeight) : r.body && (n = r.body.clientWidth, i = r.body.clientHeight);
	        var s = Math.max(e, n),
				o = Math.max(t, i);
	        return [s, o, n, i]
	    }, n.createBackground = function () {
	        var e = r.createElement("div"),
				n = e.style;
	        e.className = "wmd-prompt-background", n.position = "absolute", n.top = "0", n.zIndex = "1000", u.isIE ? n.filter = "alpha(opacity=50)" : n.opacity = "0.5";
	        var i = t.getPageSize();
	        return n.height = i[1] + "px", u.isIE ? (n.left = r.documentElement.scrollLeft, n.width = r.documentElement.clientWidth) : (n.left = "0", n.width = "100%"), r.body.appendChild(e), e
	    }, n.prompt = function (n, i, s) {
	        var o, a;
	        i === undefined && (i = "");
	        var f = function (e) {
	            var t = e.charCode || e.keyCode;
	            t === 27 && l(!0)
	        },
				l = function (t) {
				    e.removeEvent(r.body, "keydown", f);
				    var n = a.value;
				    return t ? n = null : (n = n.replace(/^http:\/\/(https?|ftp):\/\//, "$1://"), /^(?:https?|ftp):\/\//.test(n) || (n = "http://" + n)), o.parentNode.removeChild(o), s(n), !1
				},
				c = function () {
				    o = r.createElement("div"), o.className = "wmd-prompt-dialog", o.style.padding = "10px;", o.style.position = "fixed", o.style.width = "400px", o.style.zIndex = "1001";
				    var s = r.createElement("div");
				    s.innerHTML = n, s.style.padding = "5px", o.appendChild(s);
				    var c = r.createElement("form"),
						h = c.style;
				    c.onsubmit = function () {
				        return l(!1)
				    }, h.padding = "0", h.margin = "0", h.cssFloat = "left", h.width = "100%", h.textAlign = "center", h.position = "relative", o.appendChild(c), a = r.createElement("input"), a.type = "text", a.value = i, h = a.style, h.display = "block", h.width = "80%", h.marginLeft = h.marginRight = "auto", c.appendChild(a);
				    var p = r.createElement("input");
				    p.type = "button", p.onclick = function () {
				        return l(!1)
				    }, p.value = "确定", p.className = "btn btn-primary", h = p.style, h.margin = "10px", h.display = "inline", h.width = "7em";
				    var d = r.createElement("input");
				    d.type = "button", d.onclick = function () {
				        return l(!0)
				    }, d.value = "取消", d.className = "btn", h = d.style, h.margin = "10px", h.display = "inline", h.width = "7em", c.appendChild(p), c.appendChild(d), e.addEvent(r.body, "keydown", f), o.style.top = "50%", o.style.left = "50%", o.style.display = "block", u.isIE_5or6 && (o.style.position = "absolute", o.style.top = r.documentElement.scrollTop + 200 + "px", o.style.left = "50%"), r.body.appendChild(o), o.style.marginTop = -(t.getHeight(o) / 2) + "px", o.style.marginLeft = -(t.getWidth(o) / 2) + "px"
				};
	        setTimeout(function () {
	            c();
	            var e = i.length;
	            if (a.selectionStart !== undefined) a.selectionStart = 0, a.selectionEnd = e;
	            else if (a.createTextRange) {
	                var t = a.createTextRange();
	                t.collapse(!1), t.moveStart("character", -e), t.moveEnd("character", e), t.select()
	            }
	            a.focus()
	        }, 0)
	    };
	    var y = g.prototype;
	    y.prefixes = "(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)", y.unwrap = function (e) {
	        var t = new i("([^\\n])\\n(?!(\\n|" + this.prefixes + "))", "g");
	        e.selection = e.selection.replace(t, "$1 $2")
	    }, y.wrap = function (e, t) {
	        this.unwrap(e);
	        var n = new i("(.{1," + t + "})( +|$\\n?)", "gm"),
				r = this;
	        e.selection = e.selection.replace(n, function (e, t) {
	            return (new i("^" + r.prefixes, "")).test(e) ? e : t + "\n"
	        }), e.selection = e.selection.replace(/\s+$/, "")
	    }, y.doBold = function (e, t) {
	        return this.doBorI(e, t, 2, this.getString("boldexample"))
	    }, y.doItalic = function (e, t) {
	        return this.doBorI(e, t, 1, this.getString("italicexample"))
	    }, y.doBorI = function (e, t, n, r) {
	        e.trimWhitespace(), e.selection = e.selection.replace(/\n{2,}/g, "\n");
	        var s = /(\**$)/.exec(e.before)[0],
				o = /(^\**)/.exec(e.after)[0],
				u = Math.min(s.length, o.length);
	        if (u >= n && (u != 2 || n != 1)) e.before = e.before.replace(i("[*]{" + n + "}$", ""), ""), e.after = e.after.replace(i("^[*]{" + n + "}", ""), "");
	        else if (!e.selection && o) {
	            e.after = e.after.replace(/^([*_]*)/, ""), e.before = e.before.replace(/(\s?)$/, "");
	            var a = i.$1;
	            e.before = e.before + o + a
	        } else {
	            !e.selection && !o && (e.selection = r);
	            var f = n <= 1 ? "*" : "**";
	            e.before = e.before + f, e.after = f + e.after
	        }
	        return
	    }, y.stripLinkDefs = function (e, t) {
	        return e = e.replace(/^[ ]{0,3}\[(\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm, function (e, n, r, i, s) {
	            return t[n] = e.replace(/\s*$/, ""), i ? (t[n] = e.replace(/["(](.+?)[")]$/, ""), i + s) : ""
	        }), e
	    }, y.addLinkDef = function (e, t) {
	        var n = 0,
				r = {};
	        e.before = this.stripLinkDefs(e.before, r), e.selection = this.stripLinkDefs(e.selection, r), e.after = this.stripLinkDefs(e.after, r);
	        var i = "",
				s = /(\[)((?:\[[^\]]*\]|[^\[\]])*)(\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g,
				o = function (e) {
				    n++, e = e.replace(/^[ ]{0,3}\[(\d+)\]:/, "  [" + n + "]:"), i += "\n" + e
				},
				u = function (e, t, i, a, f, l) {
				    return i = i.replace(s, u), r[f] ? (o(r[f]), t + i + a + n + l) : e
				};
	        e.before = e.before.replace(s, u), t ? o(t) : e.selection = e.selection.replace(s, u);
	        var a = n;
	        return e.after = e.after.replace(s, u), e.after && (e.after = e.after.replace(/\n*$/, "")), e.after || (e.selection = e.selection.replace(/\n*$/, "")), e.after += "\n\n" + i, a
	    }, y.doLinkOrImage = function (e, t, r) {
	        e.trimWhitespace(), e.findTags(/\s*!?\[/, /\][ ]?(?:\n[ ]*)?(\[.*?\])?/);
	        var i;
	        if (!(e.endTag.length > 1 && e.startTag.length > 0)) {
	            e.selection = e.startTag + e.selection + e.endTag, e.startTag = e.endTag = "";
	            if (/\n\n/.test(e.selection)) {
	                this.addLinkDef(e, null);
	                return
	            }
	            var s = this,
					o = function (n) {
					    i.parentNode.removeChild(i);
					    if (n !== null) {
					        e.selection = (" " + e.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g, "$1\\").substr(1);
					        var o = " [999]: " + b(n),
								u = s.addLinkDef(e, o);
					        e.startTag = r ? "![" : "[", e.endTag = "][" + u + "]", e.selection || (r ? e.selection = s.getString("imagedescription") : e.selection = s.getString("linkdescription"))
					    }
					    t()
					};
	            return i = n.createBackground(), r ? this.hooks.insertImageDialog(o) || n.prompt(this.getString("imagedialog"), f, o) : n.prompt(this.getString("linkdialog"), l, o), !0
	        }
	        e.startTag = e.startTag.replace(/!?\[/, ""), e.endTag = "", this.addLinkDef(e, null)
	    }, y.doAutoindent = function (e, t) {
	        var n = this,
				r = !1;
	        e.before = e.before.replace(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]*\n$/, "\n\n"), e.before = e.before.replace(/(\n|^)[ ]{0,3}>[ \t]*\n$/, "\n\n"), e.before = e.before.replace(/(\n|^)[ \t]+\n$/, "\n\n"), !e.selection && !/^[ \t]*(?:\n|$)/.test(e.after) && (e.after = e.after.replace(/^[^\n]*/, function (t) {
	            return e.selection = t, ""
	        }), r = !0), /(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]+.*\n$/.test(e.before) && n.doList && n.doList(e), /(\n|^)[ ]{0,3}>[ \t]+.*\n$/.test(e.before) && n.doBlockquote && n.doBlockquote(e), /(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before) && n.doCode && n.doCode(e), r && (e.after = e.selection + e.after, e.selection = "")
	    }, y.doBlockquote = function (e, t) {
	        e.selection = e.selection.replace(/^(\n*)([^\r]+?)(\n*)$/, function (t, n, r, i) {
	            return e.before += n, e.after = i + e.after, r
	        }), e.before = e.before.replace(/(>[ \t]*)$/, function (t, n) {
	            return e.selection = n + e.selection, ""
	        }), e.selection = e.selection.replace(/^(\s|>)+$/, ""), e.selection = e.selection || this.getString("quoteexample");
	        var n = "",
				r = "",
				i;
	        if (e.before) {
	            var s = e.before.replace(/\n$/, "").split("\n"),
					u = !1;
	            for (var a = 0; a < s.length; a++) {
	                var f = !1;
	                i = s[a], u = u && i.length > 0, /^>/.test(i) ? (f = !0, !u && i.length > 1 && (u = !0)) : /^[ \t]*$/.test(i) ? f = !0 : f = u, f ? n += i + "\n" : (r += n + i, n = "\n")
	            }
	            /(^|\n)>/.test(n) || (r += n, n = "")
	        }
	        e.startTag = n, e.before = r, e.after && (e.after = e.after.replace(/^\n?/, "\n")), e.after = e.after.replace(/^(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*)/, function (t) {
	            return e.endTag = t, ""
	        });
	        var l = function (t) {
	            var n = t ? "> " : "";
	            e.startTag && (e.startTag = e.startTag.replace(/\n((>|\s)*)\n$/, function (e, t) {
	                return "\n" + t.replace(/^[ ]{0,3}>?[ \t]*$/gm, n) + "\n"
	            })), e.endTag && (e.endTag = e.endTag.replace(/^\n((>|\s)*)\n/, function (e, t) {
	                return "\n" + t.replace(/^[ ]{0,3}>?[ \t]*$/gm, n) + "\n"
	            }))
	        };
	        /^(?![ ]{0,3}>)/m.test(e.selection) ? (this.wrap(e, o.lineLength - 2), e.selection = e.selection.replace(/^/gm, "> "), l(!0), e.skipLines()) : (e.selection = e.selection.replace(/^[ ]{0,3}> ?/gm, ""), this.unwrap(e), l(!1), !/^(\n|^)[ ]{0,3}>/.test(e.selection) && e.startTag && (e.startTag = e.startTag.replace(/\n{0,2}$/, "\n\n")), !/(\n|^)[ ]{0,3}>.*$/.test(e.selection) && e.endTag && (e.endTag = e.endTag.replace(/^\n{0,2}/, "\n\n"))), e.selection = this.hooks.postBlockquoteCreation(e.selection), /\n/.test(e.selection) || (e.selection = e.selection.replace(/^(> *)/, function (t, n) {
	            return e.startTag += n, ""
	        }))
	    }, y.doCode = function (e, t) {
	        var n = /\S[ ]*$/.test(e.before),
				r = /^[ ]*\S/.test(e.after);
	        if (!r && !n || /\n/.test(e.selection)) {
	            e.before = e.before.replace(/[ ]{4}$/, function (t) {
	                return e.selection = t + e.selection, ""
	            });
	            var i = 1,
					s = 1;
	            /(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before) && (i = 0), /^\n(\t|[ ]{4,})/.test(e.after) && (s = 0), e.skipLines(i, s), e.selection ? /^[ ]{0,3}\S/m.test(e.selection) ? /\n/.test(e.selection) ? e.selection = e.selection.replace(/^/gm, "    ") : e.before += "    " : e.selection = e.selection.replace(/^(?:[ ]{4}|[ ]{0,3}\t)/gm, "") : (e.startTag = "    ", e.selection = this.getString("codeexample"))
	        } else e.trimWhitespace(), e.findTags(/`/, /`/), !e.startTag && !e.endTag ? (e.startTag = e.endTag = "`", e.selection || (e.selection = this.getString("codeexample"))) : e.endTag && !e.startTag ? (e.before += e.endTag, e.endTag = "") : e.startTag = e.endTag = ""
	    }, y.doList = function (e, t, n) {
	        var r = /(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/,
				s = /^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/,
				u = "-",
				a = 1,
				f = function () {
				    var e;
				    return n ? (e = " " + a + ". ", a++) : e = " " + u + " ", e
				},
				l = function (e) {
				    return n === undefined && (n = /^\s*\d/.test(e)), e = e.replace(/^[ ]{0,3}([*+-]|\d+[.])\s/gm, function (e) {
				        return f()
				    }), e
				};
	        e.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/, null), e.before && !/\n$/.test(e.before) && !/^\n/.test(e.startTag) && (e.before += e.startTag, e.startTag = "");
	        if (e.startTag) {
	            var c = /\d+[.]/.test(e.startTag);
	            e.startTag = "", e.selection = e.selection.replace(/\n[ ]{4}/g, "\n"), this.unwrap(e), e.skipLines(), c && (e.after = e.after.replace(s, l));
	            if (n == c) return
	        }
	        var h = 1;
	        e.before = e.before.replace(r, function (e) {
	            return /^\s*([*+-])/.test(e) && (u = i.$1), h = /[^\n]\n\n[^\n]/.test(e) ? 1 : 0, l(e)
	        }), e.selection || (e.selection = this.getString("litem"));
	        var p = f(),
				d = 1;
	        e.after = e.after.replace(s, function (e) {
	            return d = /[^\n]\n\n[^\n]/.test(e) ? 1 : 0, l(e)
	        }), e.trimWhitespace(!0), e.skipLines(h, d, !0), e.startTag = p;
	        var v = p.replace(/./g, " ");
	        this.wrap(e, o.lineLength - v.length), e.selection = e.selection.replace(/\n/g, "\n" + v)
	    }, y.doHeading = function (e, t) {
	        e.selection = e.selection.replace(/\s+/g, " "), e.selection = e.selection.replace(/(^\s+|\s+$)/g, "");
	        if (!e.selection) {
	            e.startTag = "## ", e.selection = this.getString("headingexample"), e.endTag = " ##";
	            return
	        }
	        var n = 0;
	        e.findTags(/#+[ ]*/, /[ ]*#+/), /#+/.test(e.startTag) && (n = i.lastMatch.length), e.startTag = e.endTag = "", e.findTags(null, /\s?(-+|=+)/), /=+/.test(e.endTag) && (n = 1), /-+/.test(e.endTag) && (n = 2), e.startTag = e.endTag = "", e.skipLines(1, 1);
	        var r = n == 0 ? 2 : n - 1;
	        if (r > 0) {
	            var s = r >= 2 ? "-" : "=",
					u = e.selection.length;
	            u > o.lineLength && (u = o.lineLength), e.endTag = "\n";
	            while (u--) e.endTag += s
	        }
	    }, y.doHorizontalRule = function (e, t) {
	        e.startTag = "----------\n", e.selection = "", e.skipLines(2, 1, !0)
	    }
	}(),
	function () {
	    Markdown.local = Markdown.local || {}, Markdown.local.cn = {
	        bold: "加粗 <strong> Ctrl+B",
	        boldexample: "加粗文本",
	        italic: "强调 <em> Ctrl+I",
	        italicexample: "强调文本",
	        link: "链接 <a> Ctrl+L",
	        linkdescription: "添加链接",
	        linkdialog: "<p><b>添加链接</b></p>",
	        quote: "引用 <blockquote> Ctrl+Q",
	        quoteexample: "引用",
	        code: "代码，例如 <pre><code> Ctrl+K",
	        codeexample: "在这里输入代码",
	        image: "图片 <img> Ctrl+G",
	        imagedescription: "插入图片描述",
	        imagedialog: "<p><b>插入图片</b></p>",
	        olist: "有序列表 <ol> Ctrl+O",
	        ulist: "无序列表 <ul> Ctrl+U",
	        litem: "列表",
	        heading: "标题 <h1>/<h2> Ctrl+H",
	        headingexample: "标题",
	        hr: "分隔线 <hr> Ctrl+R",
	        undo: "取消 - Ctrl+Z",
	        redo: "重做 - Ctrl+Y",
	        redomac: "重做 - Ctrl+Shift+Z",
	        help: "Markdown Editing 帮助"
	    }
	}(),
	function () {
	    var e = function () {
	        typeof String.prototype.format != "function" && (String.prototype.format = function () {
	            for (var e = this, t = 0; t < arguments.length; ++t) e = e.replace(new RegExp("\\{" + t + "\\}", "g"), arguments[t]);
	            return e
	        }), typeof String.prototype.trim != "function" && (String.prototype.trim = function () {
	            return this.replace(/^\s+|\s+$/g, "")
	        })
	    };
	    typeof module != "undefined" ? module.exports = e : e()
	}(),
	function (e, t, n) {
	    "use strict";
	    var r, i;
	    e.uaMatch = function (e) {
	        e = e.toLowerCase();
	        var t = /(opr)[\/]([\w.]+)/.exec(e) || /(chrome)[ \/]([\w.]+)/.exec(e) || /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [],
				n = /(ipad)/.exec(e) || /(iphone)/.exec(e) || /(android)/.exec(e) || /(windows phone)/.exec(e) || /(win)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/i.exec(e) || [];
	        return {
	            browser: t[3] || t[1] || "",
	            version: t[2] || "0",
	            platform: n[0] || ""
	        }
	    }, r = e.uaMatch(t.navigator.userAgent), i = {}, r.browser && (i[r.browser] = !0, i.version = r.version, i.versionNumber = parseInt(r.version)), r.platform && (i[r.platform] = !0);
	    if (i.android || i.ipad || i.iphone || i["windows phone"]) i.mobile = !0;
	    if (i.cros || i.mac || i.linux || i.win) i.desktop = !0;
	    if (i.chrome || i.opr || i.safari) i.webkit = !0;
	    if (i.rv) {
	        var s = "msie";
	        r.browser = s, i[s] = !0
	    }
	    if (i.opr) {
	        var o = "opera";
	        r.browser = o, i[o] = !0
	    }
	    if (i.safari && i.android) {
	        var u = "android";
	        r.browser = u, i[u] = !0
	    }
	    i.name = r.browser, i.platform = r.platform, e.browser = i
	}(jQuery, window),
	function (e, t) {
	    typeof define == "function" && define.amd ? define(t) : typeof exports == "object" ? module.exports = t() : e.NProgress = t()
	}(this, function () {
	    function n(e, t, n) {
	        return e < t ? t : e > n ? n : e
	    }

	    function r(e) {
	        return (-1 + e) * 100
	    }

	    function i(e, n, i) {
	        var s;
	        return t.positionUsing === "translate3d" ? s = {
	            transform: "translate3d(" + r(e) + "%,0,0)"
	        } : t.positionUsing === "translate" ? s = {
	            transform: "translate(" + r(e) + "%,0)"
	        } : s = {
	            "margin-left": r(e) + "%"
	        }, s.transition = "all " + n + "ms " + i, s
	    }

	    function u(e, t) {
	        var n = typeof e == "string" ? e : l(e);
	        return n.indexOf(" " + t + " ") >= 0
	    }

	    function a(e, t) {
	        var n = l(e),
				r = n + t;
	        if (u(n, t)) return;
	        e.className = r.substring(1)
	    }

	    function f(e, t) {
	        var n = l(e),
				r;
	        if (!u(e, t)) return;
	        r = n.replace(" " + t + " ", " "), e.className = r.substring(1, r.length - 1)
	    }

	    function l(e) {
	        return (" " + (e.className || "") + " ").replace(/\s+/gi, " ")
	    }

	    function c(e) {
	        e && e.parentNode && e.parentNode.removeChild(e)
	    }
	    var e = {};
	    e.version = "0.1.6";
	    var t = e.settings = {
	        minimum: .08,
	        easing: "ease",
	        positionUsing: "",
	        speed: 200,
	        trickle: !0,
	        trickleRate: .02,
	        trickleSpeed: 800,
	        showSpinner: !0,
	        barSelector: '[role="bar"]',
	        spinnerSelector: '[role="spinner"]',
	        parent: "body",
	        template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
	    };
	    e.configure = function (e) {
	        var n, r;
	        for (n in e) r = e[n], r !== undefined && e.hasOwnProperty(n) && (t[n] = r);
	        return this
	    }, e.status = null, e.set = function (r) {
	        var u = e.isStarted();
	        r = n(r, t.minimum, 1), e.status = r === 1 ? null : r;
	        var a = e.render(!u),
                f = a.querySelector(t.barSelector),
                l = t.speed,
                c = t.easing;
	        return a.offsetWidth, s(function (n) {
	            t.positionUsing === "" && (t.positionUsing = e.getPositioningCSS()), o(f, i(r, l, c)), r === 1 ? (o(a, {
	                transition: "none",
	                opacity: 1
	            }), a.offsetWidth, setTimeout(function () {
	                o(a, {
	                    transition: "all " + l + "ms linear",
	                    opacity: 0
	                }), setTimeout(function () {
	                    e.remove(), n()
	                }, l)
	            }, l)) : setTimeout(n, l)
	        }), this
	    }, e.isStarted = function () {
	        return typeof e.status == "number"
	    }, e.start = function () {
	        e.status || e.set(0);
	        var n = function () {
	            setTimeout(function () {
	                if (!e.status) return;
	                e.trickle(), n()
	            }, t.trickleSpeed)
	        };
	        return t.trickle && n(), this
	    }, e.done = function (t) {
	        return !t && !e.status ? this : e.inc(.3 + .5 * Math.random()).set(1)
	    }, e.inc = function (t) {
	        var r = e.status;
	        return r ? (typeof t != "number" && (t = (1 - r) * n(Math.random() * r, .1, .95)), r = n(r + t, 0, .994), e.set(r)) : e.start()
	    }, e.trickle = function () {
	        return e.inc(Math.random() * t.trickleRate)
	    },
			function () {
			    var t = 0,
					n = 0;
			    e.promise = function (r) {
			        return !r || r.state() == "resolved" ? this : (n == 0 && e.start(), t++, n++, r.always(function () {
			            n--, n == 0 ? (t = 0, e.done()) : e.set((t - n) / t)
			        }), this)
			    }
			}(), e.render = function (n) {
			    if (e.isRendered()) return document.getElementById("nprogress");
			    a(document.documentElement, "nprogress-busy");
			    var i = document.createElement("div");
			    i.id = "nprogress", i.innerHTML = t.template;
			    var s = i.querySelector(t.barSelector),
					u = n ? "-100" : r(e.status || 0),
					f = document.querySelector(t.parent),
					l;
			    return o(s, {
			        transition: "all 0 linear",
			        transform: "translate3d(" + u + "%,0,0)"
			    }), t.showSpinner || (l = i.querySelector(t.spinnerSelector), l && c(l)), f != document.body && a(f, "nprogress-custom-parent"), f.appendChild(i), i
			}, e.remove = function () {
			    f(document.documentElement, "nprogress-busy"), f(document.querySelector(t.parent), "nprogress-custom-parent");
			    var e = document.getElementById("nprogress");
			    e && c(e)
			}, e.isRendered = function () {
			    return !!document.getElementById("nprogress")
			}, e.getPositioningCSS = function () {
			    var e = document.body.style,
					t = "WebkitTransform" in e ? "Webkit" : "MozTransform" in e ? "Moz" : "msTransform" in e ? "ms" : "OTransform" in e ? "O" : "";
			    return t + "Perspective" in e ? "translate3d" : t + "Transform" in e ? "translate" : "margin"
			};
	    var s = function () {
	        function t() {
	            var n = e.shift();
	            n && n(t)
	        }
	        var e = [];
	        return function (n) {
	            e.push(n), e.length == 1 && t()
	        }
	    }(),
			o = function () {
			    function n(e) {
			        return e.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function (e, t) {
			            return t.toUpperCase()
			        })
			    }

			    function r(t) {
			        var n = document.body.style;
			        if (t in n) return t;
			        var r = e.length,
						i = t.charAt(0).toUpperCase() + t.slice(1),
						s;
			        while (r--) {
			            s = e[r] + i;
			            if (s in n) return s
			        }
			        return t
			    }

			    function i(e) {
			        return e = n(e), t[e] || (t[e] = r(e))
			    }

			    function s(e, t, n) {
			        t = i(t), e.style[t] = n
			    }
			    var e = ["Webkit", "O", "Moz", "ms"],
					t = {};
			    return function (e, t) {
			        var n = arguments,
						r, i;
			        if (n.length == 2)
			            for (r in t) i = t[r], i !== undefined && t.hasOwnProperty(r) && s(e, r, i);
			        else s(e, n[1], n[2])
			    }
			}();
	    return e
	});
var OurJS = window.OurJS || {};
OurJS.Search = function () {
    var e = $(".site-search"),
        t = e.find("input"),
        n = e.find(".realQuery"),
        r = e.find(".btn"),
        i = function (e) {
            var r = t.val();
            n.val(r + " site:ourjs.com")
        };
    t.on("keyup", i), r.on("click", i), i()
}(),
	function (e) {
	    e.fn.toJSON = function () {
	        var t = {},
				n = this.serializeArray();
	        return e.each(n, function () {
	            t[this.name] !== undefined ? (t[this.name].push || (t[this.name] = [t[this.name]]), t[this.name].push(this.value || "")) : t[this.name] = this.value || ""
	        }), t
	    }
	}(jQuery), window.console = window.console || {
	    log: function () { }
	};
var OurJS = window.OurJS || {},
	conf = conf || {};
(function () {
    OurJS.navi = function () {
        var e = !1;
        $("ul.nav.toggle li>a").each(function () {
            var t = $(this),
				n = t.attr("href") || "NO-ATTR-VALUE",
				r = decodeURIComponent(location.pathname);
            r.length > 1 && n.length > 1 && (n.indexOf(r) > -1 || r.indexOf(n) > -1) && (e = !0, t.closest("li").addClass("active"), t.closest("li.dropdown").addClass("active"))
        }), !e && $("ul.nav>li").eq(0).addClass("active");
        var t = $(".nav.toggle>li").click(function (e) {
            var n = $(this),
				r = $("#about");
            t.removeClass("active"), n.addClass("active"), $(e.target).attr("id") == "aboutlink" ? r.slideDown() : r.slideUp()
        })
    }, console.log("Powered By OurJS"), OurJS.navi()
})(),
function () {
    OurJS.loadCol1 = function () {
        var e = $("#articles.col1"),
			t = $("#loader"),
			n = $("#loadmore"),
			r = function (r) {
			    r && r.preventDefault && r.preventDefault();
			    if (n.attr("disabled")) return;
			    n.attr("disabled", !0), t.show();
			    var i = conf.pageSize || 12,
					s = $("#articles .article").size(),
					o = s / i | 0;
			    $.getJSON("/json/" + conf.category + "/" + o, function (r) {
			        var s = r.length,
						o = conf.homemeta || "home",
						u = $("#articles .article").eq(0),
						a = [];
			        for (var f = 0; f < s; f++) {
			            var l = u.clone(),
							c = r[f],
							h = "/detail/" + c._id;
			            l.find(".title>a").html(c.title).attr("href", c.content ? h : c.url), l.find(".author").html(c.author).attr("href", "/userinfo/" + c.author), l.find(".category").html(c.category).attr("href", "/{0}/{1}".format(o, c.category)), l.find(".keyword").html(c.keyword).attr("href", "/bbs/{1}".format(o, c.keyword)), l.find(".formatdate.date").html(OurJS.formatDateTime(c.postdate, !0)), l.find(".summary").html(c.summary || ""), l.find(".reply").attr("href", h + "#count").find("b").html(c.replyNum || 0), a.push(l)
			        }
			        n.attr("disabled", s < i), t.hide(), e.append(a)
			    })
			};
        e.size() && ($("#articles .article").size() < conf.pageSize && n.attr("disabled", !0), n.click(r), e.size() && t.size() && $(window).scroll(function () {
            $(window).scrollTop() + $(window).height() == $(document).height() && r()
        }))
    }, OurJS.loadCol1()
}(),
function () {
    OurJS.formatUrl = function () {
        $("a.originUrl").each(function () {
            var e = $(this),
				t = e.attr("href");
            t = t.replace("http://www.", ""), t = t.replace("http://", ""), t = t.replace("https://www.", ""), t = t.replace("https://", "");
            var n = t.indexOf("/");
            n = n > 0 ? n : t.length, e.text(t.substr(0, n))
        })
    }, OurJS.formatUrl()
}(),
function () {
    OurJS.puzzle = function () {
        $(".puzzle li .btn").on("click", function () {
            var e = $(this),
				t = e.closest(".puzzle"),
				n = e.closest("li"),
				r = t.find(".result"),
				i = "answered",
				s = "correct";
            if (n.hasClass(i)) return;
            n.addClass(i), e.hasClass(s) ? e.addClass("btn-success") : (n.find(".correct").addClass("btn-success"), e.addClass("btn-danger"));
            var o = t.find("ol > li").size(),
				u = t.find(".btn-danger").size(),
				a = t.find("li.answered").size(),
				f = a - u;
            r.html(f + " / " + u + " of " + o)
        }).attr("title", function () {
            return $(this).text()
        })
    }, OurJS.puzzle()
}(),
function () {
    OurJS.loadMoreUserArticles = function () {
        var e = $("#article_container"),
			t = $("#loader"),
			n = $("#loadmore_userarticle"),
			r = conf.pageSize || 12,
			i = function (i) {
			    i && i.preventDefault();
			    if (n.attr("disabled")) return;
			    n.attr("disabled", !0), t.show();
			    var s = $("#article_container .article").size(),
					o = location.pathname.split("/")[2],
					u = s / r | 0;
			    $.getJSON("/userjson/" + o + "/" + u, function (i) {
			        var s = i.length,
						o = $("#article_container .article").eq(0),
						u = [];
			        for (var a = 0; a < s; a++) {
			            var f = i[a],
							l = o.clone();
			            l.find(".title>a").html(f.title).attr("href", "/detail/" + f._id), l.find(".author").html(f.author).attr("href", "/userinfo/" + f.author), l.find(".keyword").html(f.keyword).attr("href", "/bbs/{0}".format(f.keyword)), l.find(".formatdate.date").html(OurJS.formatDateTime(f.postdate, !0)), l.find(".summary").html(f.summary || ""), u.push(l)
			        }
			        n.attr("disabled", s < r), t.hide(), e.append(u)
			    })
			};
        $("#article_container .article").size() < r && n.attr("disabled", !0), n.click(i), e.size() && t.size() && $(window).scroll(function () {
            $(window).scrollTop() + $(window).height() == $(document).height() && i()
        })
    }, OurJS.loadMoreUserArticles()
}(),
function () {
    var e = function () {
        window.setTimeout(function () {
            window.location.reload()
        }, 50)
    },
		t = function () {
		    $("#signtab a").click(function (e) {
		        e.preventDefault(), $(this).tab("show")
		    });
		    var t = function (t) {
		        var n = $("#signup form:visible"),
					r = n.toJSON();
		        t && t.preventDefault();
		        if (!n.valid()) return;
		        return $("#signOK").attr("disabled", !0), n.closest("#signuptab").size() > 0 && $.post("/user.signup.post", r, function (t) {
		            $("#signOK").attr("disabled", !1), t && t.username ? ($("#signupSubscribe").is(":checked") && ($("#to").val($("#signupEmail").val()), $("#subscribe").attr("target", "subscribeFrame").submit(), alert("欢迎订阅我们的文摘！\r\n我们使用第三方邮件列表服务，\r\n如果您想退订\r\n在邮件正文中单击“退订”链接即可！\r\n\r\n由于第三方邮件列表的限制\r\n请您在1小时内登录邮箱，验证邮件:)")), e()) : alert("注册失败！该用户名/邮箱可能被占用")
		        }, "json"), n.closest("#signintab").size() > 0 && ($("#signOK").attr("disabled", !1), $.post("/user.signin.post", r, function (t) {
		            t && t.username ? e() : alert("登录失败！　请检查用户名或密码")
		        }, "json")), !1
		    };
		    $("#signuptab form").submit(t).validate({
		        rules: {
		            username: {
		                minlength: 4,
		                maxlength: 16,
		                required: !0
		            },
		            password: {
		                minlength: 4,
		                maxlength: 32,
		                required: !0
		            },
		            email: {
		                minlength: 4,
		                maxlength: 64,
		                email: !0
		            }
		        }
		    }), $("#signintab form").submit(t).validate({
		        rules: {
		            username: {
		                minlength: 4,
		                maxlength: 16,
		                required: !0
		            },
		            password: {
		                minlength: 4,
		                maxlength: 32,
		                required: !0
		            }
		        }
		    }), $("#signOK").attr("disabled", !1).click(t), $("#useredit form").submit(function (e) {
		        var t = $(this);
		        e.preventDefault();
		        if (t.valid()) {
		            var n = t.toJSON();
		            $.post("/user.edit.post", n, function (e) {
		                e.done ? window.location = "/userinfo/" + n.username : alert("修改失败！ 可能是密码不匹配！")
		            }, "json")
		        }
		    }).validate({
		        rules: {
		            password: {
		                minlength: 3,
		                maxlength: 32,
		                required: !0
		            },
		            email: {
		                minlength: 3,
		                maxlength: 64,
		                email: !0,
		                required: !0
		            },
		            company: {
		                maxlength: 32
		            },
		            briefinfo: {
		                maxlength: 300
		            },
		            newPassword: {
		                minlength: 3,
		                maxlength: 32
		            },
		            confPassword: {
		                minlength: 3,
		                maxlength: 32,
		                equalTo: "#newPassword"
		            }
		        }
		    }), $(".formatdate").each(function () {
		        var e = $(this),
					t = parseInt(e.text()),
					r = (new Date - t) / 1e3 | 0,
					i = e.hasClass("date"),
					s;
		        r < 0 || i ? s = n(t, i) : r < 60 ? s = r + "秒前" : r < 3600 ? s = parseInt(r / 60) + "分钟前" : r < 86400 ? s = parseInt(r / 3600) + "小时前" : r < 259200 ? s = parseInt(r / 86400) + "天前" : s = n(t, i), e.text(s)
		    });
		    if ($("#addReply").size() > 0) {
		        var r = Markdown.getSanitizingConverter();
		        r.hooks.chain("preBlockGamut", function (e, t) {
		            return e.replace(/^ {0,3}""" *\n((?:.*?\n)+?) {0,3}""" *$/gm, function (e, n) {
		                return "<blockquote>" + t(n) + "</blockquote>\n"
		            })
		        });
		        var i = new Markdown.Editor(r, null, {
		            strings: Markdown.local.cn
		        });
		        i.run()
		    }
		    $("#addReply").submit(function (e) {
		        e.preventDefault();
		        if (!conf.username && !$("#nickname").val()) return alert("Please signup or enter a nickname"), !1;
		        var t = $("#addReply").toJSON(),
					r = $("#wmd-preview"),
					i = r.html();
		        t.reply = i, i && conf._id && (conf.username || t.nickname) && $.ajax({
		            url: "/reply/add/" + conf._id,
		            type: "post",
		            data: JSON.stringify(t),
		            success: function (e) {
		                if (e) return alert(e);
		                var s = '<li><a class="avatar"><img src="http://www.gravatar.com/avatar/' + conf.useravatar + '">' + "</a>" + '<div class="info">' + " <b></b> " + ' <a target="_blank"></a>' + ' <span class="formatdate date"></span>' + "</div>" + '<div class="content"></div>' + "</li>",
							o = $(s);
		                o.find(".info b").text("#" + $("#comments_list li").size()), o.find(".info span").text(n(new Date), !0), o.find(".content").html(i), conf.username ? o.find(".info a").attr("href", "/userinfo/" + conf.username).text(conf.username) : o.find(".info a").text(t.nickname), $("#comments_list").append(o), $("#wmd-input").val("").trigger("keydown"), r.html("")
		            },
		            error: function (e, t, n) {
		                alert(t + " " + n)
		            }
		        })
		    })
		},
		n = function (e, t) {
		    var n = function (e) {
		        return e < 10 ? "0" + e : e
		    };
		    e = new Date(e);
		    var r = e.getFullYear(),
				i = e.getMonth() + 1,
				s = e.getDate(),
				o = e.getHours(),
				u = e.getMinutes(),
				a = e.getSeconds(),
				e = r + "-" + n(i) + "-" + n(s),
				f = n(o) + ":" + n(u) + ":" + n(a);
		    return t ? e : e + " " + f
		},
		r = function () {
		    $.getJSON("/user.signout.post", function (t) {
		        t.done && e()
		    })
		};
    t(), OurJS.Users = {
        refresh: e,
        signout: r
    }, OurJS.formatDateTime = n
}(),
function () {
    if (location.href.indexOf("/root/edit/") > 0) {
        if (location.href.indexOf("/root/edit/add") < 0) {
            content && $("#content").val(content), summary && $("#summary").val(summary);
            var e = $("[name=category]").attr("data");
            $("[name=category] option").each(function () {
                $(this).val() == e && $(this).attr("selected", !0)
            });
            var e = $("[name=keyword]").attr("data");
            $("[name=keyword] option").each(function () {
                $(this).val() == e && $(this).attr("selected", !0)
            })
        } else $("input, textarea").each(function () {
            var e = $(this),
				t = e.val();
            t.length < 20 && t.trim() == "undefined" && e.val("")
        });
        $("#saveDraft").click(function () {
            $("#verify").val("-1"), $("#editArticleForm").submit()
        }), $("#editArticleForm").submit(function (e) {
            var t = $("#summary").val(),
				n = $("#content").val();
            t.length < 100 && n.length < 100 && (e.preventDefault(), alert("请填写至少100字的摘要或正文"))
        }), $(".editor").wysihtml5({
            html: !0,
            stylesheets: ["/css/libs.min.css", "/css/prod.min.css?v=217"]
        })
    }
}(),
function () {
    var e = decodeURIComponent(location.pathname),
		t = function (e) {
		    e.closest("li").addClass("active"), e.attr("href", "javascript:void(0)")
		};
    $(".pagination>ul>li>a").each(function () {
        var n = $(this),
			r = n.attr("href"),
			i = e.indexOf(r);
        i > -1 && !jQuery.isNumeric(e.charAt(i + r.length)) && t(n)
    }), $(".pagination>ul>li.active").size() < 1 && t($(".pagination>ul>li>a").eq(0)), $("#keyNav>ul>li").removeClass("active"), $("#keyNav>ul>li>a").each(function () {
        var n = $(this);
        if (e.indexOf(n.attr("href")) > -1) {
            t(n);
            return
        }
    }), $("#keyNav>ul>li.active").size() < 1 && t($("#keyNav>ul>li>a").eq(0))
}(),
function () {
    OurJS.count = function () {
        $(".count").each(function () {
            var e = $(this),
				t = 0,
				n = 0,
				r = $(e.data("count")).text().split("").forEach(function (e) {
				    e.charCodeAt(0) > 255 && t++, n++
				});
            e.find("span").text("[ 非英文:{0}, 总字符:{1} ]".format(t, n))
        })
    }, OurJS.count()
}(),
function () {
    var e = $("#nickname"),
		t = "白毕卞蔡曹岑常车陈成程池邓丁范方樊费冯符傅甘高葛龚古关郭韩何贺洪侯胡华黄霍姬简江姜蒋金康柯孔赖郎乐雷黎李连廉梁廖林凌刘柳龙卢鲁陆路吕罗骆马梅孟莫母穆倪宁欧区潘彭蒲皮齐戚钱强秦丘邱饶任沈盛施石时史司徒苏孙谭汤唐陶田童涂王危韦卫魏温文翁巫邬吴伍武席夏萧谢辛邢徐许薛严颜杨叶易殷尤于余俞虞元袁岳云曾詹张章赵郑钟周邹朱褚庄卓",
		n = "一乙二十丁厂七卜人入八九几儿了力乃刀又三于干亏士工土才寸下大丈与万上小口巾山千乞川亿个勺久凡及夕丸么广亡门义之尸弓己已子卫也女飞刃习叉马乡丰王井开夫天无元专云扎艺木五支厅不太犬区历尤友匹车巨牙屯比互切瓦止少日中冈贝内水见午牛手毛气升长仁什片仆化仇币仍仅斤爪反介父从今凶分乏公仓月氏勿欠风丹匀乌凤勾文六方火为斗忆订计户认心尺引丑巴孔队办以允予劝双书幻玉刊示末未击打巧正扑扒功扔去甘世古节本术可丙左厉右石布龙平灭轧东卡北占业旧帅归且旦目叶甲申叮电号田由史只央兄叼叫另叨叹四生失禾丘付仗代仙们仪白仔他斥瓜乎丛令用甩印乐句匆册犯外处冬鸟务包饥主市立闪兰半汁汇头汉宁穴它讨写让礼训必议讯记永司尼民出辽奶奴加召皮边发孕圣对台矛纠母幼丝式刑动扛寺吉扣考托老执巩圾扩扫地扬场耳共芒亚芝朽朴机权过臣再协西压厌在有百存而页匠夸夺灰达列死成夹轨邪划迈毕至此贞师尘尖劣光当早吐吓虫曲团同吊吃因吸吗屿帆岁回岂刚则肉网年朱先丢舌竹迁乔伟传乒乓休伍伏优伐延件任伤价份华仰仿伙伪自血向似后行舟全会杀合兆企众爷伞创肌朵杂危旬旨负各名多争色壮冲冰庄庆亦刘齐交次衣产决充妄闭问闯羊并关米灯州汗污江池汤忙兴宇守宅字安讲军许论农讽设访寻那迅尽导异孙阵阳收阶阴防奸如妇好她妈戏羽观欢买红纤级约纪驰巡",
		r = function () {
		    return t.charAt(Math.random() * t.length) + n.charAt(Math.random() * n.length) + n.charAt(Math.random() * n.length)
		},
		i = function () {
		    var t = $("#wmd-input");
		    $(".comments .command a.reply").on("click", function () {
		        var e = $(this).closest("li"),
					n = e.find(".floor").text(),
					r = e.find(".info a").text(),
					i = t.val();
		        i && (i += "\n"), t.focus().val(i + "@{1} #{0}\n\n".format(n, r))
		    }), $(".comments .command a.remove").on("click", function () {
		        var e = $(this).closest("li"),
					t = e.find(".content"),
					n = parseInt(e.find(".floor").text()),
					r = conf._id;
		        n > -1 && r && $.get("/reply/del/{0}/{1}".format(r, n), function (e) {
		            t.html("<s>" + t.text() + "</s>")
		        })
		    }), $("#addReply .icon-refresh").on("click", function () {
		        var t = r();
		        e.val(t).change()
		    }), e.on("change", function () {
		        $.cookie("nickname", e.val(), {
		            expires: 365,
		            path: "/"
		        })
		    }).val($.cookie("nickname") || r()).change()
		};
    i()
}(),
function () {
    var e = $(".menu.nav"),
		t = $(".btn.btn-navbar").on("click", function () {
		    e.css("display", e.is(":visible") ? "" : "block")
		}),
		n;
    $(document).on("touchstart", function (r) {
        if (n) return;
        n = setTimeout(function () {
            n = null;
            var i = $(r.target);
            t.is(":visible") && e.is(":visible") && i.closest(".btn-navbar").size() < 1 && i.closest(".nav").size() < 1 && e.css("display", "")
        }, 100)
    })
}(),
function () {
    var e = $.browser || {},
		t = NProgress;
    if (e.msie && $.browser.versionNumber < 8) return;
    t.configure({
        parent: ".navbar .navbar-inner",
        template: '<div class="bar" role="bar"></div>'
    }), t.start(), $(document).ready(function () {
        t.inc(.5), setTimeout(function () {
            t.done()
        }, 4e3)
    }).ajaxStart(function () {
        t.start()
    }).ajaxComplete(function () {
        t.done()
    }), $(window).load(function () {
        t.done()
    })
}() /* Powered by OurJS.com */