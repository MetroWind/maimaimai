function Text({text, on_change})
{
    const [current_text, setText] = React.useState(text);

    function onChange(e)
    {
        setText(e.target.value);
        on_change(e.target.value);
    }

    return e("input", {type: "text", className: "Text",
                       onChange: onChange, value: current_text});
}

function LabeledText({container_tag="div", cell_tag="span",
                      label, text, on_change})
{
    return e(container_tag, {className: "Row LabeledText"},
             e(cell_tag, {}, e("label", {}, label)),
             e(cell_tag, {}, e(Text, {text: text, on_change: on_change})));
}

function RemovableText({text, on_change, on_remove})
{
    return e("div", {className: "Row"},
             e(Text, {text: text, on_change: on_change}),
             e(Button, {label: "X", on_click: on_remove, type: "float"}));
}

function EditAlternativeView({alternative, on_change, on_remove})
{
    const [current_alt, setAlternative] = React.useState(alternative);

    function onTitleChange(value)
    {
        let new_alt = structuredClone(current_alt);
        new_alt.title = value;
        setAlternative(new_alt);
        on_change(new_alt);
    }

    function onPriceChange(value)
    {
        let new_alt = structuredClone(current_alt);
        new_alt.price = value;
        setAlternative(new_alt);
        on_change(new_alt);
    }

    function onURLChange(value)
    {
        let new_alt = structuredClone(current_alt);
        new_alt.url = value;
        setAlternative(new_alt);
        on_change(new_alt);
    }

    function onImageURLChange(value)
    {
        let new_alt = structuredClone(current_alt);
        new_alt.image_url = value;
        setAlternative(new_alt);
        on_change(new_alt);
    }

    function onDescChange(event)
    {
        let new_alt = structuredClone(current_alt);
        new_alt.desc = event.target.value;
        setAlternative(new_alt);
        on_change(new_alt);
    }

    function onAddPro()
    {
        let new_alt = structuredClone(current_alt);
        new_alt.pros.push("");
        setAlternative(new_alt);
        on_change(new_alt);
    }

    function onAddCon(event)
    {
        let new_alt = structuredClone(current_alt);
        new_alt.cons.push("");
        setAlternative(new_alt);
        on_change(new_alt);
    }

    function onProChange(i, new_pro)
    {
        let new_alt = structuredClone(current_alt);
        new_alt.pros[i] = new_pro;
        setAlternative(new_alt);
        on_change(new_alt);
    }

    function onConChange(i, new_con)
    {
        let new_alt = structuredClone(current_alt);
        new_alt.cons[i] = new_con;
        setAlternative(new_alt);
        on_change(new_alt);
    }

    function onRemovePro(i)
    {
        console.debug("Removing pro...");
        let new_alt = structuredClone(current_alt);
        new_alt.pros.splice(i, 1);
        setAlternative(new_alt);
        on_change(new_alt);
    }

    function onRemoveCon(i)
    {
        let new_alt = structuredClone(current_alt);
        new_alt.cons.splice(i, 1);
        setAlternative(new_alt);
        on_change(new_alt);
    }

    let pro_views = current_alt.pros.map((pro, i) =>
        e(RemovableText, {text: pro, key: pro,
                          on_change: new_pro => onProChange(i, new_pro),
                          on_remove: () => onRemovePro(i)}));
    let con_views = current_alt.cons.map((con, i) =>
        e(RemovableText, {text: con, key: con,
                          on_change: new_con => onConChange(i, new_con),
                          on_remove: () => onRemoveCon(i)}));

    return e("div", {className: "LabeledFrame"},
             e("h3", {}, current_alt.title),
             e(LabeledText, {label: "Title", text: current_alt.title,
                             on_change: onTitleChange}),
             e(LabeledText, {label: "Price", text: current_alt.price,
                             on_change: onPriceChange}),
             e(LabeledText, {label: "URL", text: current_alt.url,
                             on_change: onURLChange}),
             e(LabeledText, {label: "Image URL", text: current_alt.image_url,
                             on_change: onImageURLChange}),

             e("div", {},
               e("div", {},
                 e("label", {}, "Description")),
               e("div", {},
                 e("textarea", {onChange: onDescChange,
                                value: current_alt.desc}))),
             e("div", {}, "Pros:"),
             e("div", {}, pro_views),
             e("div", {className: "Row"},
               e(Button, {label: "Add Pro", on_click: onAddPro})),

             e("div", {}, "Cons:"),
             e("div", {}, con_views),
             e("div", {className: "Row"},
               e(Button, {label: "Add Con", on_click: onAddCon})),
             e("div", {className: "Row"},
               e(Button, {label: "Remove Alternative", on_click: on_remove})));
}

function EditComponentView({component, on_change})
{
    const [current_comp, setComponent] = React.useState(component);

    function onTitleChange(text)
    {
        let new_comp = structuredClone(current_comp);
        new_comp.title = text
        setComponent(new_comp);
        on_change(new_comp);
    }

    function onDescChange(event)
    {
        let new_comp = structuredClone(current_comp);
        new_comp.desc = event.target.value;
        setComponent(new_comp);
        on_change(new_comp);
    }

    function onAddAlternative(event)
    {
        let new_comp = structuredClone(current_comp);
        new_comp.alternatives.push(NULL_ALTERNATIVE);
        setComponent(new_comp);
        on_change(new_comp);
    }

    function onAlternativeChange(i, new_alt)
    {
        let new_comp = structuredClone(current_comp);
        new_comp.alternatives[i] = new_alt;
        setComponent(new_comp);
        on_change(new_comp);
    }

    function onAlternativeRemove(i)
    {
        let new_comp = structuredClone(current_comp);
        new_comp.alternatives.splice(i, 1);
        setComponent(new_comp);
        on_change(new_comp);
    }

    let alt_views = current_comp.alternatives.map((alt, i) =>
        e(EditAlternativeView, {alternative: alt, key: alt.title, on_change:
                                new_alt => onAlternativeChange(i, new_alt),
                                on_remove: () => onAlternativeRemove(i)}));

    return e("div", {className: "LabeledFrame"},
             e("h3", {}, "Component: " + current_comp.title),
             e(LabeledText, {label: "Title", text: current_comp.title,
                             on_change: onTitleChange}),
             e("div", {},
               e("div", {},
                 e("label", {}, "Description")),
               e("div", {},
                 e("textarea", {onChange: onDescChange,
                                value: current_comp.desc}))),
             e("div", {}, "Alternatives:"),
             e("div", {}, alt_views),
             e("div", {className: "Row"},
               e(Button, {label: "Add Alternative",
                          on_click: onAddAlternative})));
}

function EditPlanView({plan, on_change, on_done})
{
    const [current_plan, setPlan] = React.useState(plan);

    function onTitleChange(text)
    {
        let new_plan = structuredClone(current_plan);
        new_plan.title = text;
        setPlan(new_plan);
        on_change(new_plan);
    }

    function onDescChange(event)
    {
        let new_plan = structuredClone(current_plan);
        new_plan.desc = event.target.value;
        setPlan(new_plan);
        on_change(new_plan);
    }

    function onClickBtnAddComp()
    {
        let new_plan = structuredClone(current_plan);
        new_plan.components.push(NULL_COMPONENT);
        setPlan(new_plan);
        on_change(new_plan);
    }

    function onComponentChange(i, new_comp)
    {
        let new_plan = structuredClone(current_plan);
        new_plan.components[i] = new_comp;
        setPlan(new_plan);
        on_change(new_plan);
    }

    let comp_views = current_plan.components.map(
        (comp, i) => e(EditComponentView,
                       {component: comp, key: i, on_change:
                        new_comp => onComponentChange(i, new_comp)}));

    return e("div", {},
             e(LabeledText, {label: "Title", text: current_plan.title,
                             on_change: onTitleChange}),
             e("div", {},
               e("div", {},
                 e("label", {}, "Description")),
               e("div", {},
                 e("textarea", {onChange: onDescChange,
                                value: current_plan.desc}))),

             e("div", {}, comp_views),

             e("div", {className: "Row"},
               e(Button, {label: "Add Component",
                          on_click: onClickBtnAddComp}),
               e(Button, {label: "Done!", on_click: on_done})));
}
