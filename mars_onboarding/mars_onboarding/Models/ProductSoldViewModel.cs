﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace mars_onboarding.Models
{
	public class ProductSoldViewModel
	{
		public int Id { get; set; }
		public int ProductId { get; set; }
		public int CustomerId { get; set; }
		public int StoreId { get; set; }
		public System.DateTime DateSold { get; set; }

		public string CustomerName { get; set; }
		public string ProductName { get; set; }
		public string StoreName { get; set; }
	}
}