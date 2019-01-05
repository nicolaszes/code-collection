# -*- coding: utf-8 -*-
import scrapy


class BocSpider(scrapy.Spider):
    name = 'BOC'
    allowed_domains = ['http://srh.bankofchina.com/search/whpj/search.jsp']
    start_urls = ['http://srh.bankofchina.com/search/whpj/search.jsp/']

    def parse(self, response):
        print("\033[0;31m%s\033[0m" % + 123456, response.css('div.BOC_main'))
        pass
