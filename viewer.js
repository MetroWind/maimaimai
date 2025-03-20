function MarkdownDiv({source, className})
{
    return e("div", {className: className, dangerouslySetInnerHTML:
                     {__html: renderMarkdown(source)}});
}

function AlternativeView({alternative})
{
    let pros = alternative.pros.map((pro, i) =>
        e("li", {key: i}, e("span", {}, pro)));
    let cons = alternative.cons.map((con, i) =>
        e("li", {key: i}, e("span", {}, con)));

    let title = alternative.title;
    if(alternative.url != "")
    {
        title = e("a", {href: alternative.url}, alternative.title);
    }

    let style = { backgroundImage: `url(${alternative.image_url})` };

    return e("section", {className: "Alternative", style: style},
             e("div", {className: "AltTitle"},
               e("h3", {}, title),
               e("div", {className: "Price"}, alternative.price)),
             e(MarkdownDiv, {source: alternative.desc,
                             className: "Description"}),
             e("div", {className: "ProsCons"},
               e("ul", {className: "Pros"}, pros),
               e("ul", {className: "Cons"}, cons)));
}

function ComponentView({component})
{
    let alt_views = component.alternatives.map((alt, i) =>
        e(AlternativeView, {alternative: alt, key: i}));
    return e(React.Fragment, {},
             e("hr", {className: "ComponentSeparator"}),
             e("section", {className: "Component"},
               e("h2", {}, component.title),
               e(MarkdownDiv, {source: component.desc,
                               className: "Description"}),
               e("div", {className: "Alternatives"},
                 alt_views)));
}

function PlanView({plan, on_state_change})
{
    let comp_views = plan.components.map((comp, i) =>
        e(ComponentView, {component: comp, key: i}));

    return e("div", {className: "Plan"},
             e("div", {className: "PlanTitle"},
               e("h1", {}, plan.title),
               e("div", {}, e(Button, {label: "Edit", on_click: () =>
                   on_state_change("edit")}))),
             e(MarkdownDiv, {source: plan.desc, className: "Description"}),
             comp_views);
}
