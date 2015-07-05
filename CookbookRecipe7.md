# Synopsis #

```
Module("Page", function (m) {
    Class("Document", {
        has: {
            body: {
                is: rw,
                init: ""
            }
        },
        
        methods: {
            create: function () {
                this.openPage();
                this.INNER()
                this.closePage();
            },
            appendBody: function (appendage) {
                this.setBody(this.getBody() + appendage)
            },
            openPage:  function () { this.appendBody("<page>") },
            closePage: function () { this.appendBody("</page>")}
        }
    });
    
    Class("DocumentWithHeadersAndFooters", {
        isa: m.Document,
        
        augment: {
            create: function () {
                this.createHeader();
                this.INNER();
                this.createFooter();
            }
        },
        
        methods: {
            createHeader: function () { this.appendBody("<header/>") },
            createFooter: function () { this.appendBody("<footer/>") }
        }
        
    })
})

Class("TPSReport", {
    isa: Page.DocumentWithHeadersAndFooters,
    
    augment: {
        create: function () {
            this.createTPSReport()
        }
    },
    
    methods: {
        createTPSReport: function () {
            this.appendBody('<report type="tps"/>')
        }
    }
    
});

var tpsReport = new TPSReport();

tpsReport.create()

var body = tpsReport.getBody()

// body now has the value: '<page><header/><report type="tps"/><footer/></page>'

```

# Description #

Coming Soon, for now look for the calls to this.INNER() in the example.

# Credits #

This cookbook entry is based on [Stevan's entry for Moose](http://search.cpan.org/~stevan/Moose-0.40/lib/Moose/Cookbook/Recipe7.pod). Thank you so much!