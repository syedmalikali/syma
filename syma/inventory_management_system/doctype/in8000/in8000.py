# Copyright (c) 2022, Syed Malik and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import flt
# from console import console

class IN8000(Document):
	def validate(self):
		if self.in8destwh == '':
			frappe.throw("Please Enter Destination Warehouse")
		if self.in8supcd == '':
			frappe.throw("Please Choose Supplier")
		if self.in8trnsdt == None:
			frappe.throw("Please Choose date")
		if self.convvalue <= 0:
			frappe.throw("Check Conversion Rate")
	def before_save(self):
		total_qty = sum(flt(d.in9qty) for d in self.get("item"))
		for d in self.get("item"):
			# if d.in9destwh == None:
			# 	d.in9destwh = self.in8destwh
			doc = frappe.get_doc('Material', d.in9itmcd)
			d.in9avcbef = doc.in3curavgc
			# frappe.msgprint(doc."Material Warehouse".in6curqty)
			try:
				child_item = frappe.get_doc("Material Warehouse", {"warehouse_code": d.in9destwh , "parent": d.in9itmcd})
				child_item.in6curqty = child_item.in6curqty + d.in9qty
				child_item.save()
				# self.in8docref=child_item.in6curqty
			except frappe.DoesNotExistError:
				frappe.clear_messages()
				row = doc.append("qty_in_warehouse", {})
				row.warehouse_code= d.in9destwh
				row.in6curqty = d.in9qty
				doc.save()
				# frappe.msgprint("Added New Row")
				# docnew = frappe.get_doc({'doctype': 'Material Warehouse','warehouse_code': self.in8destwh})
				 # , 'in6curqty': d.in9qty})
				# docnew.insert()
				# self.fail(f"Template of {d.in9itmcd}, {d.in9itmname} not published")
			# frappe.msgprint(doc.in3curavgc)
		frappe.reload_doctype("in9000")

		# total_qty = self.item(in9itmcd)
		# total_qty = sum(flt(d.in9qty) for d in self.item)
		# frappe.msgprint("total_qty")

# def total_Qty(self):
# 	total_qty=0
# 	total_qty = sum(flt(d.in9qty) for d in self.get("item"))
