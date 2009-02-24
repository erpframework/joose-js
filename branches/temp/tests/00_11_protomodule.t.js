(function (Class, Module, Role, Type, Prototype) {
return (function () {
var testobj = new Test.TAP.Class();
testobj.plan(6)

testobj.testSanity = function() {
    this.diag("Joose.Kernel.ProtoModule")
    this.ok(Joose.Kernel.ProtoModule, "Joose.Kernel.ProtoModule is here");
    
    this.is("" + Joose.Kernel.ProtoModule,'Joose.Kernel.ProtoModule', "Joose.Kernel.ProtoModule stringified correctly");
    this.is("" + Joose.Kernel.ProtoModule.meta,'a Joose.Kernel.Namespace', "Joose.Kernel.ProtoModule's meta stringified to Joose.Kernel.Namespace");
    
    this.ok(Joose.Kernel.ProtoModule.meta.methodMetaClass == Joose.Kernel.ProtoMethod, "Joose.Kernel.ProtoModule's methods are Joose.Kernel.ProtoMethod");
    
    this.ok(__global__.meta.meta.isa(Joose.Kernel.Namespace), "__global__'s meta isa Joose.Kernel.Namespace");
    this.is("" + __global__, '', "__global__ stringified to empty string");
};

return testobj;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)