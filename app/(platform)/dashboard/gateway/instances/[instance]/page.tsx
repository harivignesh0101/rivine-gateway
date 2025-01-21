import {getInstance} from "@actions/instance.action";
import {PageHeader} from "@components/custom/page-header";


export default async function InstancePage(params: any) {
    console.log(params);
    const instance = await params.instance;
    const res = await getInstance(instance)
    console.log(res)

    return (
        <>
            <PageHeader title={res.name}/>
            <div>
                <div>
                    <div className="px-4 sm:px-0">
                        <h3 className=" font-semibold ">Applicant Information</h3>
                        <p className="mt-1 max-w-2xl text-sm/6">Personal details and application.</p>
                    </div>
                    <div className="mt-6 border-t">
                        <dl className="divide-y">
                            {([...Array(15)].map((_, index) => (
                                <div key={index} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium">Full name</dt>
                                    <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0">Margot Foster</dd>
                                </div>
                            )))}
                            <div  className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium">Full name</dt>
                                <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0">Margot Foster</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    )
}
