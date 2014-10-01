Ext.define('ERPh.module.MasterData.controller.Language',{
	extend 			: 'Ext.app.Controller',
	CheckedDataEdit	: [],

	init: function() {
        var me = this;
        me.getStore('ERPh.module.MasterData.store.Language').load();
        me.control({
            "gridlanguage  button[action=delete]"          : {
                click: me.del
            }, 
            "#gridlanguage"                                 : {
               itemclick: me.viewLanguage
            },            
            "formlanguage  button[action=save]"        : {
                click: me.save
            }, 
            "formlanguage  button[action=reset]"       : {
                click: me.reset
            },
            "gridlanguage"                          : {
               itemdblclick: me.addorg
            },
            "gridlanguage textfield[action=search]"    : {
               keypress: me.search
            },
            "gridlanguage button[action=print]"        : {
               click: me.print
            },
            "formlanguage button[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    
    reloadStore: function(){
        var me = this;
        me.getStore('ERPh.module.MasterData.store.Language').reload();
    },

    viewLanguage: function(grid, record, item, index, e, eOpts){
        this.getStore('ERPh.module.MasterData.store.MinCountry').reload();
        this.getStore('ERPh.module.MasterData.store.Language').reload();
        var id      = record.data.id;
        var form    = Ext.getCmp('formlanguage');
        var grid    = Ext.getCmp('gridlanguage');
        form.getForm().setValues(record.data);

        // console.log(record.data);

        var saveButton      = form.down('button[action=save]');
        var updateButton    = form.down('button[action=update]');
        saveButton.setDisabled(true);
        updateButton.setDisabled(false);
    },

    del: function(gridPanel, selected){
        var me = this;
        me.CheckedDataEdit = new Array();
        var record = gridPanel.up('grid').getSelectionModel().getSelection();
        Ext.each(record, function(selected){
            me.CheckedDataEdit.push({
                id : selected.data.id
            });
        }); 

        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan menghapus data yang terseleksi?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url             : BASE_URL + 'MasterData/c_language/delLanguage',
                        method          : 'POST',
                        params          : {post : Ext.encode(me.CheckedDataEdit)},
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data.msg);
                            if(data.msg === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Digunakan di Table Lain',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });                             
                            } else {
                            me.reset();
                            var storeApproval = Ext.getStore('ERPh.module.MasterData.store.Language');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                            }
                        }
                    });
                }
            }
        })
    },

    reset: function(btn) {//Reset Form
        var me = this;
        var form = Ext.getCmp('formlanguage');
        var grid = Ext.getCmp('gridlanguage');
        form.getForm().reset();

        if(createLanguage == false){
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(false);
        }else{
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(true);
        }

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);
        me.getStore('ERPh.module.MasterData.store.Language').reload();
    },

    save: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var name        = form.findField('name').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterData/c_language/saveLanguage',
            method  : 'POST',
            params  : {
                name        : name
            },
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                if(data.total === 1){
                    Ext.MessageBox.show({
                        title           : 'Informasi',
                        msg             : 'Data Telah Tersimpan',
                        icon            : Ext.MessageBox.INFO,
                        buttons         : Ext.MessageBox.OK
                    });
                    me.reset();
                    me.getStore('ERPh.module.MasterData.store.Language').removeAll();
                    me.getStore('ERPh.module.MasterData.store.Language').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Language Telah Terdaftar - Silahkan Gunakan Language Lain',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                } else {
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'ID has indexed, Please Contact Your Vendor..!',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });                   
                }
            }
        });   
    },

    update: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var id          = form.findField('id').getValue();
        var name        = form.findField('name').getValue();
        
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'MasterData/c_language/editLanguage',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            name        : name
                        },
                        success : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data.total);
                            if(data.total === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Telah Dirubah',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });
                                me.reset();
                                me.getStore('ERPh.module.MasterData.store.Language').removeAll();
                                me.getStore('ERPh.module.MasterData.store.Language').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Language Telah Terdaftar - Silahkan Gunakan Language Lain',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                            } else {
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Pengisian Data Salah',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });                   
                            }
                        }
                    });
                }
            }
        });      
    },

    search: function(field, evt, opts){
        var value       = field.getValue();
            Ext.Ajax.request({
                url     : BASE_URL + 'MasterData/c_language/searchLanguage',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('ERPh.module.MasterData.store.Language');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },

    print : function(){
        window.location = BASE_URL + 'MasterData/c_language/printLanguage/';
    },
});