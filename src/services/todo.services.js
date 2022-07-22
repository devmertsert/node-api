const dynamoClient = require("../config/dynamodb");
const TableName = "todos";

module.exports = {
    list: async (req) => {
        try {
            const params = { TableName };

            const { Items = [] } = await dynamoClient.scan(params).promise();
            
            return {
                code: 200,
                message: 'All data fetched',
                status: 'success',
                data: Items
            }
        } catch (error) {
            return {
                code: 500,
                message: error,
                status: 'fail',
                data: null
            }
        }
    }
}