/*INSERT GROUP ID AND COOKIE BELOW*/

var groupId = 436001139 // << Replace 12345 with your Group Id
var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_CAEaAhAB.6C06B5B7D4184F6514B756220A14B5006581C21B75399D9D414B1859E9D854F8BE0CE0C752A6B7AA1AB9010BF717549E09E1E42E918A1502A441F0DF6F7EE4137D7B4A65961EB49FA64AB310566894BCAC4377B4F465A5DA8A80A9D98C7B5F9509EA25B0C769ADECE21E514FF0E3C3794967E2B15ACCF142B2DA8D90EAFD91A2DC6CDCF600B9ED4CE382C0930087B333D410CDBA1FC9E549547882F8F180AB0287E8F997218B5837FE1ED8DC3868485ED06D16E6030A9E8DB63A42D8C318578B2C964E2FCAEF251531DAB836FCDF1A1BAA903F6AF4EAB5F372116D2429475B619E0C771EEF22AACFE084EC91967FAC61BA17AFDEDA6763803D16906679DD02332012C892EFC2F479C6AC37AED2278331C649F855880A82E318F17241F0F3DB520ACB256C20CBF77B7EE8890B1626D07B75F3CA072CD1DF4CD3351230DD0C551210EC25B3FB257C3F46F2B36121BD7B87E9B2BCBB743666E9B56E716B581C868EBC2120401F06852600C0F87005E5942D563127FD03266CED535998A3D70FF6A56743FB1F160F6F0252089E2B34BF1A093411ECF3DF72067445013E0A285A57DEBEDADEBCCBDDE8DC7FB7FE1B71374EE8B8287C0E370F5CA17E7B147D447040FA3E1925EE66DE2D2958E25400A3C667FC05762DDA5BD7AA6FAD5BF6D56E073BE4FC22AE68678E3C7904BBEE1B36E95374D30685F20E7E47ADBCE5407FC44497DB08E14D310E4C39EC58B9A7C5DCFC7A5998CCC1CEE09827EDC6E57CF7BEC3583FB31D41F6DF82818D9D29E1E6834B729808BE3A730D4D1C8722AA7E0E0628F3036086D32BA34EE9B6D1EFF6D8E2493F1CB675F94E786E2B86F6A1BD02D66A9873B100B575FD3430C69E0685BFDB944B43AB39E599196A33B711731279CB3F52987F08D36ACFF5DBD42700B5D15FB9FA429703EA92A2F43BA1D8E84EE56BF1376176B0EDC6CFAD98A7E523C7939DABC01D1A58CA033399BCA93E704C92C924027CD867BC556DEDFC2CF4F2A1A202342B6BE3E5EB51EE42F025F558BC36D29749E37B0301D5E5C4C38B308A5EAE54C8DC606E18B6B7B2BC3E4D13C47746BE26E322C9522686819547C495BE1F363DA9C65236D037C95C303DEF41C8B18C846835A82ACA16E461A235D588C4E6AA028B99485DE04D0662B33170FC31CFDCED98D1FEF5E62BB0BA65E088E0C486FFB791C6CA14E7E4542EB394693E64E25BAFA18A76285EC549"


/*INSERT GROUP ID AND COOKIE ABOVE*/

const express = require("express");
const rbx = require("noblox.js");
const app = express();

app.use(express.static("public"));

async function startApp() {
  await rbx.setCookie(cookie);
  let currentUser = await rbx.getCurrentUser();
  console.log(currentUser.UserName);
}
startApp();

app.get("/ranker", async (req, res) => {
  try {
    // Get 'userid' and 'rank' from query parameters
    var userId = req.query.userid;
    var rank = req.query.rank;

    if (!userId || !rank) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // Validate and parse the 'userid' and 'rank'
    userId = parseInt(userId);
    rank = parseInt(rank);

    if (isNaN(userId) || isNaN(rank)) {
      return res.status(400).json({ message: "Invalid userId or rank" });
    }

    // Set the rank for the user
    await rbx.setRank(groupId, userId, rank);

    res.json({ message: "User ranked successfully!" });
  } catch (error) {
    console.error("Error setting rank:", error); // Log the error to the console
    res.status(500).json({ message: "Failed to rank user", error: error.message });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

