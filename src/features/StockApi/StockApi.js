import axios from "axios";

export default axios.create({
    baseURL:'https://stock-api-deployment.herokuapp.com'

});