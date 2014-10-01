Ext.define('ERPh.module.MasterData.controller.Region',{
	extend 			: 'Ext.app.Controller',
	CheckedDataEdit	: [],

	init: function() {
        var me = this;
        me.getStore('ERPh.module.MasterData.store.Region').load();
        me.control({
            "gridregion  button[action=delete]"          : {
                click: me.del
            }, 
            "#gridregion"                                 : {
               itemclick: me.viewRegion
            },            
            "formregion  button[action=save]"        : {
                click: me.save
            }, 
            "formregion  button[action=reset]"       : {
                click: me.reset
            },
            "gridregion"                          : {
               itemdblclick: me.addorg
            },
            "gridregion textfield[action=search]"    : {
               keypress: me.search
            },
            "gridregion button[action=print]"        : {
               click: me.print
            },
            "formregion button[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    
    reloadStore: function(){
        var me = this;
        me.getStore('ERPh.module.MasterData.store.Region').reload();
    },

    viewRegion: function(grid, record, item, index, e, eOpts){
        this.getStore('ERPh.module.MasterData.store.MinCountry').reload();
        this.getStore('ERPh.module.MasterData.store.Region').reload();
        var id      = record.data.id;
        var form    = Ext.getCmp('formregion');
        var grid    = Ext.getCmp('gridregion');
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
                        url             : BASE_URL + 'MasterData/c_region/delRegion',
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
                            var storeApproval = Ext.getStore('ERPh.module.MasterData.store.Region');
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
        var form = Ext.getCmp('formregion');
        var grid = Ext.getCmp('gridregion');
        form.getForm().reset();

        if(createRegion == false){
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(false);
        }else{
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(true);
        }

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);
        me.getStore('ERPh.module.MasterData.store.Region').reload();
    },

    save: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var id_province   = form.findField('id_province').getValue();
        var code        = form.findField('code').getValue();
        var name        = form.findField('name').getValue();
        var codearea    = form.findField('codearea').getValue();

        console.log(id_province, name);

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterData/c_region/saveRegion',
            method  : 'POST',
            params  : {
                id_province  : id_province,
                code        : code,
                name        : name,
                codearea    : codearea
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
                    me.getStore('ERPh.module.MasterData.store.Region').removeAll();
                    me.getStore('ERPh.module.MasterData.store.Region').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Region Telah Terdaftar - Silahkan Gunakan Region Lain',
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
        var id_province  = form.findField('id_province').getValue();
        var code        = form.findField('code').getValue();
        var name        = form.findField('name').getValue();
        var codearea    = form.findField('codearea').getValue();
        
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'MasterData/c_region/editRegion',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            id_province  : id_province,
                            code        : code,
                            name        : name,
                            codearea    : codearea
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
                                me.getStore('ERPh.module.MasterData.store.Region').removeAll();
                                me.getStore('ERPh.module.MasterData.store.Region').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Region Telah Terdaftar - Silahkan Gunakan Region Lain',
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
                url     : BASE_URL + 'MasterData/c_region/searchRegion',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('ERPh.module.MasterData.store.Region');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },

    print : function(){
        window.location = BASE_URL + 'MasterData/c_region/printRegion/';
    },
});