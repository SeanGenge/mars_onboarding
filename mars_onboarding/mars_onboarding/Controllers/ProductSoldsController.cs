using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using mars_onboarding.Models;

namespace mars_onboarding.Controllers
{
    public class ProductSoldsController : Controller
    {
        private MarsOnboardEntities db = new MarsOnboardEntities();

        // GET: ProductSolds
        public ActionResult Index()
        {
            return View();
        }

		// Gets the list of sales
		public ActionResult GetSales()
		{
			List<ProductSoldViewModel> sales = db.ProductSolds.Select(x => new ProductSoldViewModel
			{
				Id = x.Id,
				CustomerId = x.CustomerId,
				ProductId = x.ProductId,
				StoreId = x.StoreId,
				CustomerName = x.Customer.Name,
				ProductName = x.Product.Name,
				StoreName = x.Store.Name,
				DateSold = x.DateSold
			}).ToList();
			
			return Json(sales, JsonRequestBehavior.AllowGet);
		}

		// Gets a sale by id
		public ProductSold GetSaleById(int id)
		{
			ProductSold sale = db.ProductSolds.FirstOrDefault(x => x.Id == id);

			return sale;
		}

		// Adds a sale to the database
		public ActionResult AddSale(ProductSoldViewModel sale)
		{
			ProductSold newSale = new ProductSold()
			{
				Id = sale.Id,
				CustomerId = sale.CustomerId,
				ProductId = sale.ProductId,
				StoreId = sale.StoreId,
				DateSold = sale.DateSold
			};

			if (ModelState.IsValid)
			{
				db.ProductSolds.Add(newSale);
				db.SaveChanges();
			}

			return Json(sale, JsonRequestBehavior.AllowGet);
		}

		// Edits a sale in the database
		public ActionResult EditSale(ProductSoldViewModel sale)
		{
			ProductSold editSale = GetSaleById(sale.Id);

			editSale.CustomerId = sale.CustomerId;
			editSale.ProductId = sale.ProductId;
			editSale.StoreId = sale.StoreId;
			editSale.DateSold = sale.DateSold;

			if (ModelState.IsValid)
			{
				db.Entry(editSale).State = EntityState.Modified;
				db.SaveChanges();
			}

			return Json(sale, JsonRequestBehavior.AllowGet);
		}

		// Deletes a sale from the database
		public ActionResult DeleteSale(int id)
		{
			ProductSold sale = GetSaleById(id);

			if (ModelState.IsValid)
			{
				db.ProductSolds.Remove(sale);
				db.SaveChanges();
			}

			return Json(sale, JsonRequestBehavior.AllowGet);
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
