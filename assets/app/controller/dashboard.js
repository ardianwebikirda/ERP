Ext.define('ERPh.controller.dashboard',{
	extend	: 'Ext.app.Controller',
    init: function() {
        var me = this;
        me.getStore('ERPh.store.TreeStore');
        me.control({
            'mainmenu button[action=logout]' :{
                click   : me.logoutUser
            },
            'mainmenu'  :{
                itemclick: me.loadView
            },
            'mainmenu button[action=rubah]'  :{
                click: me.rubahPswd
            },
            "editpswd button[action=rubah]"  : {
               click: me.rubah
            }
        });
        me.callParent(arguments);
    },
    logoutUser : function(button){
        window.location = BASE_URL + 'main/logout'
    },
    rubahPswd : function(button){
        var win = Ext.create('ERPh.module.GeneralSetup.view.form.EditPswd');
        win.show();
    }, 
    rubah : function(btn){
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var oldpswd     = form.findField('oldpswd').getValue();
        var newpswd     = form.findField('newpswd').getValue();
        var konfpswd    = form.findField('konfpswd').getValue();
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah Password?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'GeneralSetup/c_users/editPswd',
                        method  : 'POST',
                        params  : {
                            oldpswd     : oldpswd,
                            newpswd     : newpswd,
                            konfpswd    : konfpswd
                        },
                        success : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            if(data.total === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Password Lama Salah',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });
                            } else if(data.total === 2) {
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Pengisian Password Baru  dan Retype Password Tidak Sama',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });                   
                            } else {
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Password Telah Dirubah',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });                                
                            }
                        }
                    });
                }
            }
        });      
    }, 
    loadView : function(tree, record, item, index, e, eOpts) {
        var me       = this;
        var tab      = Ext.getCmp('mainTab');
        var selector = record.data.selector;
        var url         = record.data.cls.replace(/_/g,'.');
        var store       = url.replace(/view/,'store');
        if (tab.getChildByElement(selector) === null) {
            var controller  = url.replace(/view/,'controller');
            var cmp = Ext.getCmp(selector);
            if(cmp !== undefined){//Pastikan bahwa component telah di destroy
                cmp.destroy();
                me.getStore(store).load();
            }
            Ext.syncRequire(url, function(){
                me.getController(controller);
                me.getStore(store);
                var menu = Ext.getCmp('mainTab').add(Ext.create(url).show());
                tab.setActiveTab(menu);
            });
        }else{
            me.getStore(store).reload();
            tab.setActiveTab(tab);
        }
    }
});
