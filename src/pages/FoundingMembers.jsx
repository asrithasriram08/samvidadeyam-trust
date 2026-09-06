import React from 'react'

const foundingMembers = [
  'Anand Srikumar',
  'Arun Mahalingam',
  'Babu Ravichandran',
  'Balachandar Venkatraman',
  'Balaji Natarjan',
  'Deepak Kumar',
  'Ganesh',
  'Kannan',
  'Lakshminarayanan',
  'Mahesh Wudali',
  'Radha',
  'Ramakrishnan KR',
  'Ramakrishnan N',
  'Ramanarayanan KV',
  'Ramanathan',
  'Ramanswamy',
  'Sreevatsadhara Sharma',
  'Sridhar Subramanian',
  'Sriram Agoram',
  'Venkat Hari',
]

export default function FoundingMembers() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About the Trust</span>
          <h1 style={{ marginTop: '0.85rem' }}>Founding Members</h1>
          <p>A circle of people who helped shape the Trust from its beginning.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ol className="founding-members-list">
            {foundingMembers.map((member) => (
              <li key={member}>
                <span className="founding-members-list__number" aria-hidden="true" />
                <span>{member}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
