!function (e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t(require("mobx")) : "function" == typeof define && define.amd ? define(
		["mobx"],
		t) : "object" == typeof exports ? exports.mobxUtils = t(require("mobx")) : e.mobxUtils = t(e.mobx)
}(this, function (e) {
	return function (e) {
		function t (o) {
			if (r[o])return r[o].exports;
			var n = r[o] = {exports: {}, id: o, loaded: !1};
			return e[o].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports
		}

		var r = {};
		return t.m = e, t.c = r, t.p = "", t(0)
	}([
		function (e, t, r) {
			"use strict";
			function o (e) {
				for (var r in e)t.hasOwnProperty(r) || (t[r] = e[r])
			}

			o(r(5)), o(r(9)), o(r(6)), o(r(4)), o(r(7)), o(r(8)), o(r(10)), o(r(3)), o(r(2))
		}, function (t, r) {
			t.exports = e
		}, function (e, t) {
			"use strict";
			function r (e, t) {
				if (void 0 === t && (t = "Illegal state"), !e)throw new Error("[mobx-utils] " + t)
			}

			function o (e) {
				n.indexOf(e) === -1 && (n.push(e), console.error("[mobx-utils] Deprecated: " + e))
			}

			t.NOOP = function () {
			}, t.IDENTITY = function (e) {
				return e
			}, t.invariant = r;
			var n = [];
			t.deprecated = o
		}, function (e, t, r) {
			"use strict";
			function o (e, t, r, o) {
				if (void 0 === r && (r = 0), void 0 === o && (o = 0), !n.isObservableArray(e))throw new Error("Expected observable array as first argument");
				n.isAction(t) || (t = n.action("chunkProcessor", t));
				var i = function () {
					for (var r = function () {
						var r = 0 === o ? e.length : Math.min(e.length, o), i = e.slice(0, r);
						n.runInAction(function () {
							return e.splice(0, r)
						}), t(i)
					}; e.length > 0;)r()
				};
				return r > 0 ? n.autorunAsync(i, r) : n.autorun(i)
			}

			var n = r(1);
			t.chunkProcessor = o
		}, function (e, t, r) {
			"use strict";
			function o (e) {
				return new u(e)
			}

			var n = this && this.__decorate || function (e, t, r, o) {
					var n, i = arguments.length, s = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t,
						r) : o;
					if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e,
						t,
						r,
						o); else for (var a = e.length - 1; a >= 0; a--)(n = e[a]) && (s = (i < 3 ? n(s) : i > 3 ? n(t,
							r,
							s) : n(t, r)) || s);
					return i > 3 && s && Object.defineProperty(t, r, s), s
				}, i = r(1), s = r(2), a = ["model", "reset", "submit", "isDirty", "isPropertyDirty"], u = function () {
				function e (e) {
					var t = this;
					this.model = e, this.localValues = i.asMap({}), s.invariant(i.isObservableObject(e),
						"createViewModel expects an observable object"), Object.keys(e).forEach(function (e) {
						s.invariant(a.indexOf(e) === -1,
							"The propertyname " + e + " is reserved and cannot be used with viewModels"), Object.defineProperty(
							t,
							e,
							{
								enumerable: !0, configurable: !0, get: function () {
								return t.isPropertyDirty(e) ? t.localValues.get(e) : t.model[e]
							}, set: i.action(function (r) {
								(t.isPropertyDirty(e) || r !== t.model[e]) && t.localValues.set(e, r)
							})
							})
					})
				}

				return Object.defineProperty(e.prototype, "isDirty", {
					get: function () {
						return this.localValues.size > 0
					}, enumerable: !0, configurable: !0
				}), e.prototype.isPropertyDirty = function (e) {
					return this.localValues.has(e)
				}, e.prototype.submit = function () {
					var e = this;
					this.localValues.keys().forEach(function (t) {
						var r = e.localValues.get(t), o = e.model[t];
						i.isObservableArray(o) ? o.replace(r) : i.isObservableMap(o) ? (o.clear(), o.merge(r)) : e.model[t] = r
					}), this.localValues.clear()
				}, e.prototype.reset = function () {
					this.localValues.clear()
				}, e.prototype.resetProperty = function (e) {
					this.localValues["delete"](e)
				}, n([i.computed], e.prototype, "isDirty", null), n([i.action],
					e.prototype,
					"submit",
					null), n([i.action],
					e.prototype,
					"reset",
					null), n([i.action], e.prototype, "resetProperty", null), e
			}();
			t.createViewModel = o
		}, function (e, t, r) {
			"use strict";
			function o (e, t, r) {
				return void 0 === t && (t = void 0), void 0 === r && (r = i.IDENTITY), new s(e, t, r)
			}

			var n = r(1), i = r(2);
			t.PENDING = "pending", t.FULFILLED = "fulfilled", t.REJECTED = "rejected";
			var s = function () {
				function e (e, t, r) {
					var o = this;
					void 0 === t && (t = void 0), void 0 === r && (r = i.IDENTITY), this.promise = e, this.modifier = r, this._state = n.observable(
						"pending"), this._reason = n.observable(void 0), this._observable = n.observable(r(t)), e.then(n.action(
						"observableFromPromise-resolve",
						function (e) {
							o._observable.set(e), o._state.set("fulfilled")
						}), n.action("observableFromPromise-reject", function (e) {
						o._reason.set(e), o._observable.set(e), o._state.set("rejected")
					}))
				}

				return Object.defineProperty(e.prototype, "value", {
					get: function () {
						return this._observable.get()
					}, enumerable: !0, configurable: !0
				}), Object.defineProperty(e.prototype, "state", {
					get: function () {
						return this._state.get()
					}, enumerable: !0, configurable: !0
				}), Object.defineProperty(e.prototype, "reason", {
					get: function () {
						return i.deprecated("In `fromPromise`: `.reason` is deprecated, use `.value` instead"), this._reason.get()
					}, enumerable: !0, configurable: !0
				}), e.prototype["case"] = function (e) {
					switch (this.state) {
						case"pending":
							return e.pending && e.pending();
						case"rejected":
							return e.rejected && e.rejected(this.value);
						case"fulfilled":
							return e.fulfilled && e.fulfilled(this.value)
					}
				}, e
			}();
			t.fromPromise = o
		}, function (e, t, r) {
			"use strict";
			function o (e, t, r) {
				void 0 === t && (t = i.NOOP), void 0 === r && (r = void 0);
				var o = !1, s = !1, a = r, u = function () {
					o && (o = !1, t())
				}, c = new n.Atom("ResourceBasedObservable", function () {
					i.invariant(!o && !s), o = !0, e(n.action("ResourceBasedObservable-sink", function (e) {
						a = e, c.reportChanged()
					}))
				}, u);
				return {
					current: function () {
						i.invariant(!s, "subscribingObservable has already been disposed");
						var e = c.reportObserved();
						return e || o || console.warn(
							"Called `get` of an subscribingObservable outside a reaction. Current value will be returned but no new subscription has started"), a
					}, dispose: function () {
						s = !0, u()
					}, isAlive: function () {
						return o
					}
				}
			}

			var n = r(1), i = r(2);
			t.fromResource = o
		}, function (e, t, r) {
			"use strict";
			function o (e, t, r, o) {
				void 0 === r && (r = 1e4), void 0 === o && (o = function () {
				});
				var i = !1, s = setTimeout(function () {
					i || (a(), o())
				}, r), a = n.when(e, function () {
					i = !0, clearTimeout(s), t()
				});
				return function () {
					clearTimeout(s), a()
				}
			}

			var n = r(1);
			t.whenWithTimeout = o
		}, function (e, t, r) {
			"use strict";
			function o (e, t) {
				var r = n.extras.getAtom(e, t);
				if (!r)throw new Error("No computed provided, please provide an object created with `computed(() => expr)` or an object + property name");
				return r.observe(function () {
				})
			}

			var n = r(1);
			t.keepAlive = o
		}, function (e, t, r) {
			"use strict";
			function o (e, t, r) {
				void 0 === t && (t = void 0), void 0 === r && (r = n.IDENTITY);
				var o = !1, s = i.observable(r(t)), a = function () {
					return o || (o = !0, e(i.action("lazyObservable-fetch", function (e) {
						s.set(e)
					}))), s.get()
				};
				return {
					current: a, refresh: function () {
						return o = !1, a()
					}
				}
			}

			var n = r(2), i = r(1);
			t.lazyObservable = o
		}, function (e, t, r) {
			"use strict";
			function o (e, t, r) {
				if (void 0 === r && (r = 0), !n.isObservableArray(e))throw new Error("Expected observable array as first argument");
				n.isAction(t) || (t = n.action("queueProcessor", t));
				var o = function () {
					var r = e.slice(0);
					n.runInAction(function () {
						return e.splice(0)
					}), r.forEach(t)
				};
				return r > 0 ? n.autorunAsync(o, r) : n.autorun(o)
			}

			var n = r(1);
			t.queueProcessor = o
		}
	])
});