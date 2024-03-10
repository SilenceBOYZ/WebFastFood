const { QueryTypes } = require('sequelize');
const { seqeuelize } = require("../../config");

let readItems = (pageNum, caterId, caterName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let catergoriesId = "";
      let stringQuery = "";
      if(caterId === undefined) {
        catergoriesId = "";
      } else if(isNaN(caterId)){
        if(caterId.toLowerCase() === "all") {
          catergoriesId = "";
        }
      } else if(caterId > 0) {
        catergoriesId = `AND catergoryId = ${caterId}`;
      }
      if(caterName === null || caterName === undefined) {
        stringQuery = ""
      } else if(caterName.trim() !== "" && caterName.trim().toLowerCase() !== "all") {
        stringQuery = ` AND items.foodName LIKE '${caterName}%'`
      }
      if (isNaN(pageNum)) {
        pageNum = 1
      }
      let allItems = await seqeuelize.query("SELECT items.id, `foodName`, `foodPrice`, `foodDesc`, `foodImage`, `catergoryName` FROM items, catergories WHERE items.catergoryId = catergories.id " + catergoriesId + stringQuery, { type: QueryTypes.SELECT });
      const pageSize = 10;
      const totalItem= allItems.length;
      // Tính toán tổng số trang
      const totalPages = Math.ceil(totalItem / pageSize);
      const startIndex = (pageNum - 1) * pageSize;
      const maxLinksDisplayed = 10;
      // Số lượng liên kết tối đa được hiển thị
      const startLink = 1;
      const endLink = totalPages;

      if (totalPages > maxLinksDisplayed) {
        // Nếu tổng số trang lớn hơn số lượng liên kết tối đa được hiển thị,
        // ta cần điều chỉnh số lượng liên kết được hiển thị
        startLink = Math.max(1, pageNum - Math.floor(maxLinksDisplayed / 2));
        endLink = startLink + maxLinksDisplayed - 1;
    
        // Đảm bảo endLink không vượt quá totalPages
        if (endLink > totalPages) {
            endLink = totalPages;
            startLink = endLink - maxLinksDisplayed + 1;
        }
    }
      let itemPerPage = await seqeuelize.query("SELECT items.id, `foodName`, `foodPrice`, `foodDesc`, `foodImage`, `catergoryName` FROM items, catergories WHERE items.catergoryId = catergories.id " + catergoriesId + stringQuery + " LIMIT " + startIndex + " , " + pageSize, { type: QueryTypes.SELECT });
      let data = {
        items: itemPerPage,
        startLink: startLink,
        endLink: endLink,
        pageNum: pageNum,
        totalPages: totalPages,
        caterId: caterId,
        caterName: caterName, 
      }
      resolve(data); 
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  readItems,
}