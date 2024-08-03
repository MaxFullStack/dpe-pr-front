import BlockDetails from "@/components/parliamentary-blocks/parliamentary-block-details"

type Params = {
  id: string
}

type Props = {
  params: Params
}

const BlockDetailsPage = ({ params }: Props) => {
  return (
    <>
      <BlockDetails blockId={params.id} />
    </>
  )
}

export default BlockDetailsPage
