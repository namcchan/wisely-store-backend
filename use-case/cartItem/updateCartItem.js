/**
 *updateCartItem.js
 */

const  cartItemEntity = require('../../entities/cartItem');
const response = require('../../utils/response');

/**
 * @description : update record with data by id.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : updated CartItem. {status, message, data}
 */
const updateCartItem = ({
  cartItemDb, updateValidation
}) => async (params,req,res) => {
  let {
    dataToUpdate, query 
  } = params;
  const validateRequest = await updateValidation(dataToUpdate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let updatedCartItem = cartItemEntity(dataToUpdate);
  updatedCartItem = await cartItemDb.update(query,updatedCartItem);
  if (!updatedCartItem || updatedCartItem.length == 0){
    return response.recordNotFound();
  }
  return response.success({ data:updatedCartItem[0] });
};
module.exports = updateCartItem;