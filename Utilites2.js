/**
 * Created by Ahmed Shaban on 29/06/2017.
 */




(function () {

    function deleteElemet()
    {
        document.addEventListener('keydown',function (e) {
            if(e.keyCode==46)
            {

                window.ProjectManager.removeElement(curruntlyHtmlObjectSelected._id);
                //delete from design
                if (e.keyCode == 46) {
                    curruntlyHtmlObjectSelected.parentNode.parentNode.removeChild(curruntlyHtmlObjectSelected.parentNode)
                }
            }
        });
    }


    window.utiles2 = window.utiles2 || {};
    window.utiles2.deleteElemet = deleteElemet;


})();

