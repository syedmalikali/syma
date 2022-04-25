// Copyright (c) 2022, Syed Malik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Quotation', {

});


var calculate_linetotal = function(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	frappe.model.set_value(cdt, cdn, "co4totpr", child.co4qty * child.co4unitpr);

};
var calculate_totvalue = function(frm, cdt, cdn) {
	var d = locals[cdt][cdn];
	var total = 0;
    frm.doc.item.forEach(function(d) { total += d.co4totpr; });
    frm.set_value("co3totval", total);
    refresh_field("co3totval");
    var net_total=0;
    net_total=total-50
    frm.set_value("co3netval", net_total);
    refresh_field("co3netval");

};
frappe.ui.form.on('Quotation Item', {
		co4qty: function(frm,cdt, cdn){
		calculate_linetotal(frm, cdt, cdn);
    calculate_totvalue(frm, cdt,cdn);
	},
  item_remove:function(frm, cdt, cdn){
    calculate_totvalue(frm, cdt,cdn);

 },
	co4unitpr: function(frm, cdt, cdn){
		calculate_linetotal(frm, cdt, cdn);
      calculate_totvalue(frm, cdt,cdn);
	},
  co3totval: function(frm,cdt,cdn){
    calculate_totvalue(frm, cdt,cdn);
  }
})
