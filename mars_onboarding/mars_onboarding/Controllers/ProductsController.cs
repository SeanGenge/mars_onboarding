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
    public class ProductsController : Controller
    {
        private MarsOnboardEntities db = new MarsOnboardEntities();

        // GET: Products
        public ActionResult Index()
        {
            return View(db.Products.ToList());
        }

		// Gets the list of products
		public ActionResult GetProducts()
		{
			List<ProductViewModel> products = db.Products.Select(x => new ProductViewModel
			{
				Id = x.Id,
				Name = x.Name,
				Price = x.Price
			}).ToList();

			return Json(products, JsonRequestBehavior.AllowGet);
		}

		// Gets a product by id
		public Product GetProductById(int id)
		{
			Product product = db.Products.FirstOrDefault(x => x.Id == id);

			return product;
		}

		// Adds a product to the database
		public ActionResult AddProduct(ProductViewModel product)
		{
			Product newProduct = new Product()
			{
				Id = product.Id,
				Name = product.Name,
				Price = product.Price
			};

			if (ModelState.IsValid)
			{
				db.Products.Add(newProduct);
				db.SaveChanges();
			}

			return Json(product, JsonRequestBehavior.AllowGet);
		}

		// Edits a product in the database
		public ActionResult EditProduct(ProductViewModel product)
		{
			Product editProduct = GetProductById(product.Id);

			editProduct.Name = product.Name;
			editProduct.Price = product.Price;

			if (ModelState.IsValid)
			{
				db.Entry(editProduct).State = EntityState.Modified;
				db.SaveChanges();
			}

			return Json(product, JsonRequestBehavior.AllowGet);
		}

		// Deletes a product from the database
		public ActionResult DeleteProduct(int id)
		{
			Product product = GetProductById(id);

			if (ModelState.IsValid)
			{
				db.Products.Remove(product);
				db.SaveChanges();
			}

			return Json(product, JsonRequestBehavior.AllowGet);
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
