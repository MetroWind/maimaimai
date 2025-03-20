function Window({title, children})
{
    return e("div", {className: "Window"},
             e("div", {className: "Titlebar"}, title),
             e("div", {}, children));
}

function AppView({init_plan})
{
    const [app_state, setAppState] = React.useState("view");
    const [plan, setPlan] = React.useState(init_plan);

    function onPlanChange(new_plan)
    {
        setPlan(new_plan);
    }

    function onStateChange(new_state)
    {
        setAppState(new_state);
    }

    function onDoneEdit()
    {
        setAppState("view");
        compressObj(plan).then(s => {
            const url = new URL(location);
            url.searchParams.set("plan", s);
            window.history.pushState({}, "", url);
        });
    }

    if(app_state == "view")
    {
        return e("div", {className: "Viewer"},
                 e(PlanView, {plan: plan,
                              on_state_change: onStateChange}));
    }
    else if(app_state == "edit")
    {
        return e("div", {className: "Editor"},
                 e(Window, {title: "Edit Plan 🙃🙃🙃"},
                   e(EditPlanView, {plan: plan, on_change: onPlanChange,
                                    on_done: onDoneEdit})));
    }
}

function render(plan)
{
    ReactDOM.createRoot(document.getElementById('AppWrapper')).render(
        e(AppView, {init_plan: plan}));
}

const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);
const encoded_plan = searchParams.get("plan");
if(encoded_plan === null)
{
    render(NULL_PLAN);
}
else
{
    decompressObj(encoded_plan).then(p => render(p));
}
