let show_reply = (request_user_id, comment_id) => {
    if (request_user_id == 0) {
        document.location.href= "/accounts/login/"
    } else {
        let element = document.getElementById("form_cmt"+comment_id);
        element.classList.remove("hidden-comment");
        element.classList.add("show-comment");
    }

};
let create_comment = (request_user_id, comment_id,comment_content,comment_count_like,comment_path,comment_check_like,
                                    user_id,user_name,comment_edit,comment_delete,like_change, comment_add) => {
            let edit_cmt = "'"+comment_id+"','"+comment_edit+"'";
            let str = 
                '<div class="mt-2" id="item'+comment_id+'">'
                +'    <div class="d-flex">'
                +'        <div class="px-2 d-block" style="font-size: 30px;">'
                +'            <i class="fa-solid fa-user"></i>'
                +'        </div>'
                +'        <div class="d-block col" id="content_card'+comment_id+'">'
                +'            <div class="card">'
                +'                <div class="card-header d-flex text-center align-items-center">'
                +'                    <strong class="me-2">'+user_name+'</strong>'
                if (request_user_id == user_id) {
                str +=
                '                    <div class="d-flex">'
                +"                        <button class='btn btn-secondary mx-1' onClick="+"edit_cmt("+edit_cmt+")"+">"
                +'                            <i class="fa-solid fa-pen-to-square"></i>'
                +'                        </button>'
                +'                        <button class="btn btn-secondary mx-1"onClick="delete_cmt('
                +'                                                                        '+comment_id+','
                +"                                                                        '"+comment_delete+"'"
                +'                                                                        )">'
                +'                            <i class="fa-solid fa-trash"></i>'
                +'                        </button>'
                +'                    </div>'
                }
                str +=
                '                </div>'
                +'                <div class="card-body">'
                +'                    <div id="show_content'+comment_id+'">'
                +'                        <p id="content_cmt'+comment_id+'">'+comment_content+'</p>'
                +'                    </div>'
                +'                    <div class="d-flex">'
                +'                        <button class="btn btn-secondary me-2" id="like'+comment_id+'" onClick="like_cmt('
                +'                                                                                                '+request_user_id+','
                +'                                                                                                '+comment_id+','
                +'                                                                                                '+comment_count_like+','
                +"                                                                                                '"+like_change+"',"
                if (comment_check_like) str += "'is_like'"
                else str += "'no_like'"

                str +=  ')">'
                
                if (comment_check_like != null)
                    str +='<i class="fa-solid fa-thumbs-up"></i>'+comment_count_like
                else 
                    str += '<i class="fa-regular fa-thumbs-up"></i>'+comment_count_like
                str +=                         
                                           
                '                        </button>'
                +'                        <button class="btn btn-secondary" id="reply'+comment_id+'" onclick="show_reply('+request_user_id+","+ comment_id+')">'
                +'                            Reply'
                +'                        </button>'
                +'                    </div>'
                +'                </div>'
                +'            </div>'
                +'            <div class="reply">'
                +'                <form class="mt-2 hidden-comment" id="form_cmt'+comment_id+'">'
                +'                    <input type="text" class="form-control" id="add_cmt'+comment_id+'" name="content" placeholder="New reply">'
                +'                    <button type="button" class="btn btn-secondary" onClick="add_form('
                +'                                                                                '+comment_id+','
                +"                                                                                '"+comment_path+"',"
                +"                                                                                '"+comment_add+"'"
                +'                                                                                )">'
                +'                        <i class="fa-solid fa-paper-plane"></i>'
                +'                    </button>'
                +'                </form>'
                +'            </div>'
                +'        </div>'
                +'       </div>'
                +'</div>'
                return str;
        }

let edit_cmt = (comment_id,url_form) => {
    let content = document.getElementById("show_content"+comment_id);
    let cmt = document.getElementById("content_cmt"+comment_id);
    let cmt_temp = cmt.innerText;
    console.log(url_form);
    cmt.remove();

    let form = document.createElement("form");
    // form.setAttribute("method", "post");
    // form.setAttribute("action", url_form);
    form.setAttribute('class','d-flex my-2')
    form.setAttribute("id", "comment-edit"+comment_id);

    // let div = document.createElement("div");
    // div.setAttribute('class','d-flex my-2')

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "content");
    input.setAttribute("class", "form-control");
    input.setAttribute("id", "input"+comment_id);
    input.setAttribute("value", cmt_temp);

    let i = document.createElement("i");
    i.setAttribute("class", "fa-solid fa-paper-plane");

    let button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.setAttribute("class", "btn btn-secondary");
    button.addEventListener("click", edit_form(comment_id,url_form));
    button.append(i);

    form.appendChild(input);
    form.appendChild(button);
    content.appendChild(form);
}

let add_form = (comment_id, path, url_form) => {
    $(document).ready(function() {
        let content = document.getElementById('add_cmt'+comment_id).value;
        console.log(content);
        payload = JSON.stringify({'content':content});
        
        $.ajax({
            url: url_form,
            type: 'POST',       
            data: payload,
            dataType : "json"
        }).done(function(message){
            data = JSON.parse(message);
            console.log(data)
            // console.log(data.product_id)
            let comment_edit = "/comment/comment_edit/"+data.product_id+"/"+data.id;
            let comment_delete = "/comment/comment_delete/"+data.id;
            let like_change = "/comment/like_change/"+data.id;
            let comment_add = "/comment/comment_add/"+data.product_id+"/"+data.path;
            let node_comment = create_comment(
                data.request_user_id,
                data.id,
                data.content,
                data.count_like,
                data.path,
                data.check_like,
                data.user_id,
                data.user_name,
                comment_edit,
                comment_delete,
                like_change,
                comment_add
                );
            console.log(data.is_create)
            if (data.is_create == 1) {
                console.log("ddddd")
                document.getElementById("comment").innerHTML += node_comment;

            } else {
                let element = document.getElementById("form_cmt"+comment_id);
                element.classList.remove("show-comment");
                element.classList.add("hidden-comment");
                document.getElementById("content_card"+comment_id).innerHTML += node_comment;
            }


        });
      });
}

let edit_form = (comment_id,url_form) => {
    $(document).ready(function() {
        $('#comment-edit'+comment_id).on('submit', function(event) {
            event.preventDefault(); // Ngăn chặn gửi form mặc định
            let content = document.getElementById('input'+comment_id).value;
            console.log(content);
            console.log(url_form);
            payload = JSON.stringify({'content':content});
            $.ajax({
                url: url_form,
                type: 'POST',       
                data: payload,
                dataType : "json"
            }).done(function(message){
                console.log(message);
                let content_new = document.getElementById("input"+comment_id).value;
                $('#comment-edit'+comment_id).remove();       
                let element = document.getElementById("show_content"+comment_id);
                let p = document.createElement("p");
                p.setAttribute("id", "content_cmt"+comment_id);
                p.textContent = content_new;
                element.appendChild(p);
            });
        });
      });
}

let delete_cmt = (comment_id,url_form) => {
    if (confirm("You want delete your comment?") == true) {
        $.ajax({
            url: url_form,
            type: 'GET',       
        }).done(function(message){
            // console.log(message)
            // let content_new = document.getElementById("input"+comment_id).value;
            // $('#comment-edit').remove()               
            let element = document.getElementById("item"+comment_id);
            element.remove();
            // let p = document.createElement("p");
            // p.setAttribute("id", "content_cmt"+comment_id);
            // p.textContent = content_new
            // element.appendChild(p)
        });
    } else {
        
    }
}
let like_cmt = (request_user_id,comment_id, like_count, url_form, like) => {
    if (request_user_id == 0) {
        document.location.href= "/accounts/login/"
    } else {
        let element = document.getElementById("like"+comment_id);
        let check_like = 1;
        console.log("ssss")
        if(element.innerHTML.includes("solid")) { // da like
            console.log("ko like");      
            payload = JSON.stringify({'like':'delete like'});
            check_like = 0;
        } else {
            console.log("like");
            payload = JSON.stringify({'like':'like'});
            check_like = 1;
        }
        $.ajax({
            url: url_form,
            type: 'POST',  
            data: payload,
            dataType : "json"
        }).done(function(message){         
            if (check_like == 0) {
                like == "is_like"? like_count-- : 0;
                element.innerHTML = '<i class="fa-regular fa-thumbs-up"></i>' + like_count;
            } else {
                like == "no_like"? like_count++ : 0;
                element.innerHTML = '<i class="fa-solid fa-thumbs-up"></i>' + like_count;
            }
        });
    }
}
