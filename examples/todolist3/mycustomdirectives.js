(function() {
	var my = {
		onenterkey: "x-onenterkey",
		visible: "x-visible",
		linethrough: "x-linethrough",
		focus: "x-focus",
		checked: "x-checked",
		value: "x-value",
		foreach: "x-foreach-",
		toggleclass: "x-toggleclass-",
		onevent: "x-on"
	};
	dataBinder.onDataBinding = function(node) {
		var toRemove = [];
		for (var i=0; i<node.attributes.length; i++) {
			var attr = node.attributes[i];
			if (attr.specified) {
				if (attr.name == my.onenterkey)
					node.setAttribute("bind-event-keypress", "if (event.which == 13) {" + attr.value + "; return false}");
				else if (attr.name == my.visible)
					node.setAttribute("bind-statement-" + attr.name, "$(thisElem).toggle(Boolean(" + attr.value + "))");
				else if (attr.name == my.linethrough)
					node.setAttribute("bind-statement-" + attr.name, "$(thisElem).css('text-decoration', " + attr.value + " ? 'line-through' : '')");
				else if (attr.name == my.focus)
					node.setAttribute("bind-statement-" + attr.name, "if (" + attr.value + ") thisElem.focus()");
				else if (attr.name == my.checked)
					node.setAttribute("bind-statement-" + attr.name, "thisElem.checked = " + attr.value);
				else if (attr.name == my.value)
					node.setAttribute("bind-statement-" + attr.name, "thisElem.value = " + attr.value);
				else if (attr.name.lastIndexOf(my.foreach,0) == 0) {
					node.setAttribute("bind-repeater-i", attr.value + ".length");
					node.setAttribute("bind-var-" + attr.name.substr(my.foreach.length), attr.value + "[#i]");
				}
				else if (attr.name.lastIndexOf(my.toggleclass,0) == 0)
					node.setAttribute("bind-statement-" + attr.name, "$(thisElem).toggleClass('" + attr.name.substr(my.toggleclass.length) + "', " + attr.value + ")");
				else if (attr.name.lastIndexOf(my.onevent,0) == 0)
					node.setAttribute("bind-event-" + attr.name.substr(my.onevent.length), attr.value);
				else continue;
				toRemove.push(attr.name);
			}
		}
		for (var i=0; i<toRemove.length; i++) node.removeAttribute(toRemove[i]);
	};
})();
