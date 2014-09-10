Ext.define('ERPh.module.GeneralSetup.view.grid.GridUsersOrg', {
    extend   : 'Ext.grid.Panel',
    store    : 'ERPh.module.GeneralSetup.store.UsersOrganisasi',
    title    : 'Grid Users Organisasi',
    alias    : 'widget.gridusersorg',
    id       : 'gridusersorg', 
    height      : 250,
    width       : 250,
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '10%'
        },
        {
            dataIndex: 'id_users',
            hidden   : true
        },
        {
            dataIndex: 'id_org',
            hidden   : true
        },
        {
            text     : 'Organisasi',
            dataIndex: 'name',
            width    : '70%'
        },
        {
            text     : 'Delete',
            xtype    :'actioncolumn',
            width    :'15%',
            items    : [{              
                            iconCls: 'icon-delete',
                            tooltip: 'Delete',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                var id_users = rec.get('id_users');
                                var id_org = rec.get('id_org');
                                Ext.MessageBox.show({
                                    title           : 'Konfirmasi',
                                    msg             : 'Anda yakin akan menghapus data yang terseleksi?',
                                    buttons         : Ext.Msg.YESNO,
                                    icon            : Ext.MessageBox.WARNING,
                                    width           : 450,
                                    fn              : function(btn, evtObj){
                                        if (btn == 'yes') {
                                            Ext.Ajax.request({
                                                url             : BASE_URL + 'GeneralSetup/c_users/deluserOrg',
                                                method          : 'POST',
                                                params          : { id_users : id_users, id_org : id_org },   
                                                success         : function(response){
                                                    var data    = Ext.JSON.decode(response.responseText);
                                                    var storeModul = Ext.getStore('ERPh.module.GeneralSetup.store.UsersOrganisasi');
                                                    storeModul.removeAll();
                                                    storeModul.add(data.data);

                                                }
                                            });
                                        }
                                    }
                                })

                            }
                        }]
        }
    ],
});