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
    public class StoresController : Controller
    {
        private MarsOnboardEntities db = new MarsOnboardEntities();

        // GET: Stores
        public ActionResult Index()
        {
            return View(db.Stores.ToList());
        }

		// Gets the list of stores
		public ActionResult GetStores()
		{
			List<StoreViewModel> stores = db.Stores.Select(x => new StoreViewModel
			{
				Id = x.Id,
				Name = x.Name,
				Address = x.Address
			}).ToList();

			return Json(stores, JsonRequestBehavior.AllowGet);
		}

		// Gets a store by id
		public Store GetStoreById(int id)
		{
			Store store = db.Stores.FirstOrDefault(x => x.Id == id);

			return store;
		}

		// Adds a store to the database
		public ActionResult AddStore(StoreViewModel store)
		{
			Store newStore = new Store()
			{
				Id = store.Id,
				Name = store.Name,
				Address = store.Address
			};

			if (ModelState.IsValid)
			{
				db.Stores.Add(newStore);
				db.SaveChanges();
			}

			return Json(store, JsonRequestBehavior.AllowGet);
		}

		// Edits a store in the database
		public ActionResult EditStore(StoreViewModel store)
		{
			Store editStore = GetStoreById(store.Id);

			editStore.Name = store.Name;
			editStore.Address = store.Address;

			if (ModelState.IsValid)
			{
				db.Entry(editStore).State = EntityState.Modified;
				db.SaveChanges();
			}

			return Json(store, JsonRequestBehavior.AllowGet);
		}

		// Deletes a store from the database
		public ActionResult DeleteStore(int id)
		{
			Store store = GetStoreById(id);

			if (ModelState.IsValid)
			{
				db.Stores.Remove(store);
				db.SaveChanges();
			}

			return Json(store, JsonRequestBehavior.AllowGet);
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
