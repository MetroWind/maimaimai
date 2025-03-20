let e = React.createElement;

const PLAN_EXAMPLE = {
    "schema_version": 1,
    "title": "Some Plan",
    "desc": "This is a description.",
    "components": [{
        "title": "Component 0",
        "desc": "It's the 0th component",
        "alternatives": [{
            "title": "Product 0",
            "desc": "It's a product",
            "url": "http://google.com",
            "image_url": "https://aaa.com/bbb.avif",
            "price": "$1",
            "pros": ["aaa", "bbb"],
            "cons": ["ccc", "ddd"]
        }, {
            "title": "Product 1",
            "desc": "It's another product",
            "url": "http://reddit.com",
            "image_url": "",
            "price": "$2",
            "pros": ["aaa", "bbb"],
            "cons": ["Expensive", "ddd"]
        }]
    }]
};

const NULL_PLAN = {
    "schema_version": 1,
    "title": "",
    "desc": "",
    "components": [],
};

const NULL_COMPONENT = {
    "title": "",
    "desc": "",
    "alternatives": [],
};

const NULL_ALTERNATIVE = {
    "title": "",
    "desc": "",
    "url": "",
    "image_url": "",
    "pros": [],
    "cons": [],
}

function Button({label, on_click, type=null})
{
    let class_name = "Button";
    if(type == "float")
    {
        class_name = "FloatButton";
    }
    return e("a", {className: class_name, href: "javascript:void(0)",
                   onClick: on_click}, label);
}

var md_reader = new commonmark.Parser({smart: true});
var md_writer = new commonmark.HtmlRenderer();

function renderMarkdown(src)
{
    return md_writer.render(md_reader.parse(src));
}
