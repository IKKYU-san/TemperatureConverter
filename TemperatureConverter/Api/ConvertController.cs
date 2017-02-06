using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace TemperatureConverter.Api
{
    public class ConvertController : ApiController
    {
        // GET api/<controller>
        public async Task<HttpResponseMessage> Get(string degree, string from)
        {
            float number;
            string response;
            bool result = float.TryParse(degree, out number);
            if (result)
            {
                var client = new ConverterServiceReference.TempConvertSoapClient();
                switch (from)
                {
                    case "celsius":
                        response = await client.CelsiusToFahrenheitAsync(degree);
                        break;
                    case "farenheit":
                        response = await client.FahrenheitToCelsiusAsync(degree);
                        break;
                    default:
                        response = "Fail";
                        break;
                }
            }
            else
            {
                response = "Fail";
            }
      
            return new HttpResponseMessage()
            {
                Content = new StringContent(response, System.Text.Encoding.UTF8, "text/html")
            };
        }
    }
}
