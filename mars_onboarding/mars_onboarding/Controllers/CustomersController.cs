using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using mars_onboarding.Models;

namespace mars_onboarding.Controllers
{
    public class CustomersController : Controller
    {
        private MarsOnboardEntities db = new MarsOnboardEntities();

        // GET: Customers
        public ActionResult Index()
        {
            return View(db.Customers.ToList());
        }

		// Gets the list of customers
		public ActionResult GetCustomers()
		{
			List<CustomerViewModel> customers = db.Customers.Select(x => new CustomerViewModel
			{
				Id = x.Id,
				Name = x.Name,
				Address = x.Address
			}).ToList();

			return Json(customers, JsonRequestBehavior.AllowGet);
		}

		// Gets a customer by id
		public Customer GetCustomerById(int id)
		{
			Customer customer = db.Customers.FirstOrDefault(x => x.Id == id);

			return customer;
		}

		// Adds a customer to the database
		[HttpPost]
		public ActionResult AddCustomer(CustomerViewModel customer)
		{
			Customer newCustomer = new Customer()
			{
				Id = customer.Id,
				Name = customer.Name,
				Address = customer.Address
			};

			if (ModelState.IsValid)
			{
				db.Customers.Add(newCustomer);
				db.SaveChanges();
			}

			return Json(customer, JsonRequestBehavior.AllowGet);
		}

		// Edits a customer in the database
		[HttpPost]
		public ActionResult EditCustomer(CustomerViewModel customer)
		{
			Customer editCustomer = GetCustomerById(customer.Id);

			editCustomer.Name = customer.Name;
			editCustomer.Address = customer.Address;

			if (ModelState.IsValid)
			{
				db.Entry(editCustomer).State = EntityState.Modified;
				db.SaveChanges();
			}

			return Json(customer, JsonRequestBehavior.AllowGet);
		}

		// Deletes a customer from the database
		[HttpPost]
		public ActionResult DeleteCustomer(int id)
		{
			Customer customer = GetCustomerById(id);

			if (ModelState.IsValid)
			{
				db.Customers.Remove(customer);
				db.SaveChanges();
			}

			return Json(customer, JsonRequestBehavior.AllowGet);
		}

		protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
