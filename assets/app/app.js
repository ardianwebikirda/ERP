Ext.Loader.setConfig({
    enabled : true,
    paths   : {
        'Ext'       : BASE_URL + ROOTDIR + 'extjs/src',
        'Ext.ux'    : BASE_URL + ROOTDIR + 'extjs/ux',
    }
});

Ext.application({
    name       : 'ERPh',
    appFolder  :  BASE_URL + ROOTDIR + 'app',
	controllers	: ['ERPh.controller.dashboard'],
	autoCreateViewport: true,
	launch     : function()
	{
        var me = this;
        setInterval(me.jamDigital, 1000);
    },
    
    jamDigital: function()
    {
        var tanggal = new Date();
        //Jam
        var jam     = tanggal.getHours().toString();
        if(jam.length == 1){
            jam     = '0' + jam;
        }
        var menit   = tanggal.getMinutes().toString();
        if(menit.length==1){
            menit   = '0' + menit;
        }
        var detik   = tanggal.getSeconds().toString();
        if(detik.length==1){
            detik   = '0' + detik;
        }
        Ext.getCmp("timeStatus").update(jam + ":" + menit + ":" + detik);
        Ext.getCmp("dateStatus").update(tanggal.getDate() + '-' + (tanggal.getMonth() + 1) + '-' + tanggal.getFullYear());
    }
});