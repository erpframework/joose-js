Joose.MetaRole = new Joose.MetaClass('Joose.MetaRole', {
    
    isa                         : Joose.Kernel.Role,
    
    
    methods : {

	    //'to' must be instance 
        apply : function(to) {
        	if (!Joose.O.isInstance(to)) throw "Role can be applied only to Joose instance"
        	
        	if (!to.meta.hasMethod('detach')) throw "Instance [" + to + "] has no 'detach' method";
        	
        	to.detach();
        	
        	to.meta.extend({ does : [ this.c ] })
        },
        
        
        unapply : function(from) {
        	if (!Joose.O.isInstance(from)) throw "Role can be unapplied only from Joose instance"
        	
        	if (!(from.meta instanceof Joose.DetachedClass)) throw "Instance [" + from + "] is not detached";
        	
        	from.meta.extend({ doesnt : [ this.c ] })
        }
        
    	
    }
    
}).c;