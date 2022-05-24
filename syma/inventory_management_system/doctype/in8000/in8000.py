# Copyright (c) 2022, Syed Malik and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _
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
			# d.in9avcbef = doc.in3curavgc
			row_count = 0
			for row in doc.get("qty_in_warehouse"):
				if row.warehouse_code == d.in9destwh:
					row_count = row_count + 1
			if row_count == 0:
				row = doc.append("qty_in_warehouse", {})
				row.warehouse_code= d.in9destwh
				row.in6curqty = d.in9qty
				doc.save()
			else:
				row.in6curqty = row.in6curqty + d.in9qty
				doc.save()
			t_qty = sum(flt(d.in6curqty) for d in doc.qty_in_warehouse)
			doc.in3curqty = t_qty
			doc.in3lstpdt = self.in8trnsdt
			doc.in3lstpcst = d.in9unitcos
			doc.in3lstpsup = self.in8supcd
			doc.in3lsupname = self.in8supname
			doc.save()

			# if row_count > 0:
			# 	for row in doc.get("qty_in_warehouse"):
			# 		if row.warehouse_code == d.in9destwh:
			# 			row.in6curqty = row.in6curqty + d.in9qty
			# 	doc.save()
			# 	t_qty = sum(flt(d.in6curqty) for d in doc.qty_in_warehouse)
			# 	doc.in3curqty = t_qty
			# 	doc.save()
			# else


		#
		# 	# frappe.msgprint(doc."Material Warehouse".in6curqty)
		# 	try:
		# 		child_item = frappe.get_doc("Material Warehouse", {"warehouse_code": d.in9destwh , "parent": d.in9itmcd})
		# 		child_item.in6curqty = child_item.in6curqty + d.in9qty
		# 		child_item.save()
		#
				# t_qty = sum(flt(d.in6curqty) for d in doc.qty_in_warehouse)
		# 		doc.in3curqty = flt(t_qty)
		# 		doc.save()
		# 		# doc.in3curqty = 12
		# 	except frappe.DoesNotExistError:
		# 		frappe.clear_messages()
		# 		row = doc.append("qty_in_warehouse", {})
		# 		row.warehouse_code= d.in9destwh
		# 		row.in6curqty = d.in9qty
		# 		doc.save()
		# #
		# frappe.reload_doctype("in9000")
		#

		# total_qty = self.item(in9itmcd)
		# total_qty = sum(flt(d.in9qty) for d in self.item)
		# frappe.msgprint("total_qty")

# def total_Qty(self):
# 	total_qty=0
# 	total_qty = sum(flt(d.in9qty) for d in self.get("item"))
