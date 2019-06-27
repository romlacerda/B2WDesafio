const cheerio = require('cheerio');
const axios = require('axios');

module.exports = function getProduct(url) {
    axios.get(url)
        .then((res) => {
            if(res.status === 200) {
                const html = res.data;
                const $ = (cheerio.load(html));

                let codigo = Number($('.brNcBx').text().slice(5).slice(0, -1));

                let bcs = [];

                let breadCrumbs = $('.product-breadcrumb').children();
                breadCrumbs.each((i, elem) => {
                    bcs.push($(elem).text().trim());
                });
                let bcsFiltered = bcs.filter(b => b !== "");

                let nomeProduto = $('#product-name-default').text().toString();

                let imagem = $(".image-gallery-image img").attr("src").toString();

                let title = $("#h_brand h1 a").attr("title").toString();

                let price = $(".main-price span").text().replace("R$", "").replace(".", "").trim();

                const objeto = {
                    id: codigo,
                    breadcrumb: bcsFiltered,
                    name: nomeProduto,
                    img: imagem,
                    seller: title,
                    price: price
                }
                console.log(JSON.parse(JSON.stringify(objeto)));
            }
        }).catch(e => console.log(e));
    };
