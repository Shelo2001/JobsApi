const Jobs = require('../models/Job')

const getAllJobs = async (req, res) => {
  const jobs = await Jobs.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(200).json({ jobs: jobs })
}

const getSingleJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req
  const job = await Job.findOne({ _id: jobId, createdBy: userId })
  if (!job) {
    res.status(400).json({ job: 'asd' })
  } else {
    res.status(200).json({ job: job })
  }
}

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  })
  if (!job) {
    res.status(404).json({ job: 'asd' })
  }
  res.status(200).json({ job: job })
}

const createJob = async (req, res) => {
  const createJob = req.body
  createJob.createdBy = req.user.userId
  const job = await Jobs.create(createJob)
  res.json({ job: job })
}

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req

  if (company === '' || position === '') {
    res
      .status(400)
      .json({ error: 'Company or Position fields cannot be empty ' })
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!job) {
    res.status(404).json({ error: 'Job not found' })
  }
  res.status(200).json({ job })
}

module.exports = { getAllJobs, getSingleJob, deleteJob, createJob, updateJob }
