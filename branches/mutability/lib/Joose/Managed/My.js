Joose.Managed.My = new Joose.Managed.Role('Joose.Managed.My', {
    
    have : {
        myClass                         : null
    },
    
    
    methods : {
        createMy : function (extend) {
            var thisMeta = this.meta
            var isRole = this instanceof Joose.Managed.Role
            
            var myExtend = extend.my || {}
            delete extend.my
            
            var myExtendBody = myExtend.body
            var me = this
            
            //deferring creating instance to creating a class itself (which may be async)
            myExtend.body = function (createdClass) {
                me.c.my = isRole ? createdClass : new createdClass({ targetMeta : me })
                
                if (myExtendBody) myExtendBody.call(this, createdClass)
            }
            
            if (!isRole) myExtend.isa = myExtend.isa || this.superClass.meta.myClass || thisMeta.defaultSuperClass.meta.myClass || thisMeta.defaultSuperClass
            myExtend.meta = myExtend.meta || this.constructor
            
            this.myClass = Class(myExtend)
        }
    },
    
    
    before : {
        
        extend : function (props) {
            if (!this.myClass && this.superClass.meta.myClass) this.createMy(props)
            
            if (props.my)
                if (!this.myClass) 
                    this.createMy(props)
                else {
                    this.myClass.meta.extend(props.my)
                    delete props.my
                }
        },
        
        
        addRole : function () {
            var myStem
            
            Joose.A.each(arguments, function (arg) {
                //instanceof Class to allow treat classes as roles
                var role = (arg.meta instanceof Joose.Managed.Class) ? arg : arg.role
                
                if (role.meta.meta.hasAttribute('myClass') && role.meta.myClass) {
                    
                    if (!this.myClass) {
                        this.createMy({
                            my : {
                                does : role.meta.myClass
                            }
                        })
                        return
                    }
                    
                    myStem = this.myClass.meta.stem
                    if (!myStem.opened) myStem.open()
                    
                    myStem.addComposeInfo(role.my.meta.stem)
                }
            }, this)
            
            if (myStem) myStem.close()
        },
        
        
        removeRole : function () {
            if (!this.myClass) return
            
            var myStem = this.myClass.meta.stem
            myStem.open()
            
            Joose.A.each(arguments, function (role) {
                if (role.meta.meta.hasAttribute('myClass') && role.meta.myClass) myStem.removeComposeInfo(role.my.meta.stem)
            }, this)
            
            myStem.close()
        }
        
    }
    
}).c