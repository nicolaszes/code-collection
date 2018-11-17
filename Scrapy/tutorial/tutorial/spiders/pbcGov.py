# -*- coding: utf-8 -*-
import scrapy


class PbcgovSpider(scrapy.Spider):
    name = 'pbcGov'
    allowed_domains = ['http://www.pbc.gov.cn']
    start_urls = ['http://http://www.pbc.gov.cn/']

    def parse(self, response):
        pass
