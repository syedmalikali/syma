// Copyright (c) 2022, Syed Malik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Quotation', {

  customer: function(frm,cdt,cdn){
    //Code working for color change of item in form.
  //$('input[data-fieldname="co3cusname"]').css("color","red")
  //$('input[data-fieldname="co3cusname"]').css("background-color","#FFE4C4")// your code here

  },
  refresh: function(frm,cdt,cdn){
    calculate_totvalue(frm, cdt,cdn);
  },
  co3disamt: function(frm,cdt,cdn){
    calculate_totvalue(frm, cdt,cdn);
  },

});


var calculate_linetotal= function(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	frappe.model.set_value(cdt, cdn, "co4totpr", child.co4qty * child.co4unitpr);

};
var calculate_totvalue = function(frm, cdt, cdn) {
	var d = locals[cdt][cdn];
	  var total = 0;
    frm.doc.item.forEach(function(d) {
      total += d.co4totpr;
    });
    frm.set_value("co3totval", total);
    refresh_field("co3totval");
    var net_total=0;
    var vat =0
    var net_total_with_vat=0
    net_total=total-frm.doc.co3disamt
    var vat_status=0
    // frappe.db.get_value('Customer', {customer: '01'}, 'co2cusvat')
    // .then(r => {
    //     let values = r.message;
    //     vat_status=values.co2cusvat
    // });
    // //if (vat_status ==0 ) {vat=0;} else if (vat_status=1){vat=net_total*0.15;}

    net_total_with_vat= net_total+vat
    var total_qty = 0
    //frm.doc.item.forEach(function(d) { total_qty += d.co4qty; });
    frm.set_value("co3totqty", total_qty);
    refresh_field("co3totqty");
    frm.add_fetch('co3quotsts','co2vatnumber','co2vatnumber');
    frm.set_value("co3netval", net_total);
    refresh_field("co3netval");
    frm.set_value("co3vatval", vat);
    refresh_field("co3vatval");
    frm.set_value("co3netvalvat", net_total_with_vat);
    refresh_field("co3netvalvat");

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
  },
})
