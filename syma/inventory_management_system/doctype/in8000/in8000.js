// Copyright (c) 2022, Syed Malik and contributors
// For license information, please see license.txt

frappe.ui.form.on('IN8000', {
  refresh: function(frm,cdt,cdn){
    calculate_totvalue(frm, cdt,cdn);
  },
  in8disrate: function(frm,cdt,cdn){
    calculate_totvalue(frm, cdt,cdn);
  },

});


var calculate_linetotal = function(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	frappe.model.set_value(cdt, cdn, "in9totcost", flt(child.in9qty * child.in9unitcos));

};
var calculate_totvalue = function(frm, cdt, cdn) {
	var d = locals[cdt][cdn];
	var total = 0;
  var total_lines=0;
    frm.doc.item.forEach(function(d) { total += d.in9totcost; });
    frm.doc.item.forEach(function(d) { total_lines += 1; });
    frm.set_value("in8totval", total);
    refresh_field("in8totval");
    frm.set_value("in8totline", total_lines);
    refresh_field("in8totline");
    var net_total=0;
    var vat =0
    var net_total_with_vat=0
    net_total=total-flt(frm.doc.in8disrate)
    vat=net_total*0.15
    net_total_with_vat= (net_total)+(vat)
    var total_qty = 0
    frm.doc.item.forEach(function(d) { total_qty += d.in9qty; });
    frm.set_value("in8totqty", total_qty);
    refresh_field("in8totqty");
    frm.set_value("in8totvalvat", net_total);
    refresh_field("in8totvalvat");
    frm.set_value("in8vatamount", vat);
    // frm.set_value("in8vatamount", 15);
    refresh_field("in8vatamount");
    frm.set_value("in8totvalvat", net_total_with_vat);
    refresh_field("in8totvalvat");

};
frappe.ui.form.on('IN9000', {
		in9qty: function(frm,cdt, cdn){
		calculate_linetotal(frm, cdt, cdn);
    calculate_totvalue(frm, cdt,cdn);
	},
  item_remove:function(frm, cdt, cdn){
    calculate_totvalue(frm, cdt,cdn);

 },
	in9unitcos: function(frm, cdt, cdn){
		calculate_linetotal(frm, cdt, cdn);
      calculate_totvalue(frm, cdt,cdn);
	},

  in9totcost: function(frm,cdt,cdn){
    calculate_totvalue(frm, cdt,cdn);
  },
})












// // Copyright (c) 2022, Syed Malik and contributors
// // For license information, please see license.txt
//
// frappe.ui.form.on('IN8000', {
//   refresh: function(frm,cdt,cdn){
//     // calculate_linetotal(frm, cdt,cdn);
//   },
//
//
// });
// var calculate_linetotal = function(frm, cdt, cdn) {
//   	var child = locals[cdt][cdn];
//   	frappe.model.set_value(cdt, cdn, "in9totcost", child.in9qty * child.in9unitcos);
//     var total = 0;
//     // frm.doc.items.forEach(function(d) { total += d.in9totcost; });
//     frm.doc.item.forEach(function(d) { total += d.in9totcost; });
//     // frappe.msgprint("malik");
//     // console.log(total)
//     frm.set_value("in8totval", total);
//     refresh_field("in8totval");
//   };
// 	// refresh: function(frm) {
//
// 	// }
//
// frappe.ui.form.on('IN9000', {
// 		in9qty: function(frm,cdt, cdn){
// 		calculate_linetotal(frm, cdt, cdn);
//   },
//   in9unitcos: function(frm,cdt, cdn){
//   calculate_linetotal(frm, cdt, cdn);
// },
// item_add:function(frm, cdt, cdn){
//   calculate_linetotal(frm, cdt,cdn);
// },
// item_remove:function(frm, cdt, cdn){
//   calculate_linetotal(frm, cdt,cdn);
// },
//
//
//  //  item_remove:function(frm, cdt, cdn){
//  //    calculate_totvalue(frm, cdt,cdn);
//  //
//  // },
// 	// co4unitpr: function(frm, cdt, cdn){
// 	// 	calculate_linetotal(frm, cdt, cdn);
//  //      calculate_totvalue(frm, cdt,cdn);
// 	// },
//  //
//  //  co3totval: function(frm,cdt,cdn){
//  //    calculate_totvalue(frm, cdt,cdn);
//  //  },
// });
