/* A wrapper for JSON that correct Twitter issues and perform logging if JSON data could not be parsed
 * which will help to find out what is wrong
 */
function parseJSON(text)
{

   // Fix twitter data bug
   var re = new RegExp("Couldn\\'t\\ find\\ Status\\ with\\ ID\\=[0-9]+\\,", "g");
   text = text.replace(re, "");

   //
   var done = false
   try
   {
      var obj = JSON.parse(text);
      done = true;
   }
   finally
   {
      if (!done)
      {
         Spaz.dump("Could not parse JSON text " + text);
      }
   }

   //
   return obj;
}