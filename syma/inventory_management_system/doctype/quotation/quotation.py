# Copyright (c) 2022, Syed Malik and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _

class Quotation(Document):
	pass
	# @frappe.whitelist()
	# def test(self):
	# 	frappe.msgprint("malik test");
	# def test(self):
	# 	frappe.msgprint(("Changing Customer Group for the selected Customer is not allowed."));
	# 	for row in self.get("item"):
	# 		row.co4totpr == row.co4qty * row.co4unitpr
	# 		# frappe.msgprint(row.co4itmcd)

        # frappe.msgprint(__("Changing Customer Group for the selected Customer is not allowed."))
		# self.co3cuscont == "Bismi"
		# for item in self.items:
		# 	self.item.co4totpr == self.item.co4qty * self.item.co4unitpr;
		# # 	cost_center_company = frappe.get_cached_value("Cost Center", item.cost_center, "company")
		# 	if cost_center_company != self.company:
		# 		frappe.throw(
		# 			_("Row #{0}: Cost Center {1} does not belong to company {2}").format(
		# 				frappe.bold(item.idx), frappe.bold(item.cost_center), frappe.bold(self.company)
		# 			)
		# 		)
